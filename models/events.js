const mongoose = require('mongoose');

const {Schema}  = mongoose;

const commentSchema = new Schema({
    body: {type: String, required: true},
    author: {type: String},
    createdOn: {type: Date, "default": Date.now}
});

const eventSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    createdOn: {type: Date, "default": Date.now},
    author: {type: String, required: true},
    comments: [commentSchema]
});

mongoose.model('Event', eventSchema);