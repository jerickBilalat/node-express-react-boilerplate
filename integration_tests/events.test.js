const expect = require('chai').expect;
const request = require('supertest');
const {app} = require('../server');
const {Event} = require("../events/model");

const events = [{
  "_id": "5bc92a48116a1a4c940d8d66",
  "title": "sdfsd update",
  "body": "fsdfsd",
  "author": "jerick bilalat",
  "authorRole": "developer",
  "__v": 0,
  "comments": [],
  "createdOn": "2018-10-19T14:48:50.169Z"
},
{
  "_id": "5bc944d8d0e23c4f406da196",
  "title": "csacas",
  "body": "dcasc",
  "author": "jerick bilalat",
  "authorRole": "developer",
  "__v": 0,
  "comments": [],
  "createdOn": "2018-10-19T02:43:36.199Z"
}];


describe("POST /api/events", () => {
  it("should create an event", (done) => {
    const body = {"title":"created title", "body": "created body", "author": "auth user", "authorRole": "auth user role"};
    request(app)
      .post('/api/events')
      .send(body)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if(err) done(err);
        expect(res.body.title).to.equal("created title");
        done();
      })
  })
})


// describe("GET /events", () => {
//   it("should fetach an array of events", (done) => {


//   request(app)
//     .get('/api/events')
//     .set('Accept', 'applicaton/json')
//     .expect(200)
//     .end((err, res) => {
//       expect(res.body)
//     })


//   })
// })