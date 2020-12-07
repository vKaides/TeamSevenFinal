let mongoose = require('mongoose');

// Create a model class, Schema
let surveyModel = mongoose.Schema({
    Name: String,
    Description: String,
    Published: String,
    Start: String,
    End: String,
    Questions: [
        // Stores an array of questions
       
    ]
},
{
    collection: "survey"
});

module.exports = mongoose.model('Survey', surveyModel);