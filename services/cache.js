const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisURL = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisURL);
client.get = util.promisify(client.get);

// obtain reference of the original exec function
const exec = mongoose.Query.prototype.exec;
// we cache query everytime the exex function is invoked
mongoose.Query.prototype.exec = async function() {

  if(!this.useCache) return exec.apply(this, arguments);

  const key = JSON.stringify(Object.assign({}, this.getQuery(), {collection: this.mongooseCollection.name}));
  const cacheValue = await client.get(key);
  
  if(cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map( d => this.model(d)) 
      : new this.model(doc);
  };

  const result = await exec.apply(this, arguments);
  client.set(key, JSON.stringify(result));
  return result
}

mongoose.Query.prototype.cache = function() {
  this.useCache = true;
  return this;
}