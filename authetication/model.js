const mongoose = require('mongoose');
const {Schema} = mongoose;
const brcypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
})

UserSchema.pre('save', next => {
    const user = this;

    brcypt.genSalt(10, (err, salt) => {
        if(err) return next(err);
        brcypt.hash(user.password, salt, null, (err, hash) => {
            if(err) return next(err);
            user.password = hash;
            next();
        })
    })
})

const UserClass = mongoose.model('UserClass', UserSchema);


module.exports = UserClass;