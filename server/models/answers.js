let mongoose = require('mongoose');

// Create a model class, Schema
let answerModel = mongoose.Schema({
    Surveyor: String,
    Name: String,
    Description: String,
    DateTaken: {
        type: Date,
        default: Date.now
    },
    Q1: String,
    Q2: String,
    Q3: String,
    Q4: String,
    Q5: String,
    Q6: String,
    Q7: String,
    Q8: String,
    Answer1: String,
    Answer2: String,
    Answer3: String,
    Answer4: String,
    Answer5: String,
    Answer6: String,
    Answer7: String,
    Answer8: String,
},
{
    collection: "answers"
});

module.exports = mongoose.model('Answers', answerModel);