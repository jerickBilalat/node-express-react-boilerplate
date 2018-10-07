const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt-nodejs');

const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/*This regular expression match can be used for validating strong password.
 It expects atleast 1 small-case letter, 1 Capital letter, 1 digit, 1 special character and the length should be between 6-10 characters. 
 The sequence of the characters is not important. 
 */
const passwordRegEx = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {
      type: String,
      validate: {
        validator: function(v){
          return emailRegEx.test(v);
        },
        message: "{VALUE} email is not valid"
      },
      required: [true, "Email is required"]
    },
    password: {
      type: String,
      validate: {
        validator: function(v){
          return passwordRegEx.test(v);
        },
        message: "{VALUE} password is not valid"
      },
      required: [true, "password is not provided"]
    },
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