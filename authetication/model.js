const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
})


UserSchema.pre('save', function(next) {
    // get access to the user model
    const user = this;
  
    // generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
      if (err) { return next(err); }
  
      // hash (encrypt) our password using the salt
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) { return next(err); }
  
        // overwrite plain text password with encrypted password
        user.password = hash;
        next();
      });
    });
  });


UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) {console.log(err); return callback(err); }
        
      callback(null, isMatch);
    });
  }

const UserClass = mongoose.model('UserClass', UserSchema);


module.exports = UserClass;