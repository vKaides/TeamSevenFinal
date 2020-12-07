let mongoose = require('mongoose');

// Create a model class, Schema
let questionModel = mongoose.Schema({
    Question: String,
    Answer: String,
},
{
    collection: "question"
});

module.exports = mongoose.model('Question', questionModel);