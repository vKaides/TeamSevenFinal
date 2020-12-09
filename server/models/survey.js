let mongoose = require('mongoose');

// Create a model class, Schema
let surveyModel = mongoose.Schema({
    Surveyor: String,
    Name: String,
    Description: String,
    Published: {
        type: Date,
        default: Date.now
    },
    Start: Date,
    End: Date,
    Question1: String,
    Question2: String,
    Question3: String,
    Question4: String,
    Question5: String,
    Question6: String,
    Question7: String,
    Question8: String,
},
{
    collection: "survey"
});

module.exports = mongoose.model('Survey', surveyModel);