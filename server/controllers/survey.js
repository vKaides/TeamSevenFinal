let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Create a reference to the model
let Survey = require('../models/survey');
let Answers = require('../models/answers');
/*-------------------------------------------------------------*/

// Displays the Survey List Page
module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('survey/list', 
            {
                title: 'Survey List', 
                SurveyList: surveyList,
                displayName: req.user ? req.user.displayName: ''
            });
            //console.log(SurveyList);
        }
    });
};

/*-------------------------------------------------------------*/

// Displays Add Survey page
module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', 
    {
        title: 'Add Survey',
        displayName: req.user ? req.user.displayName: ''
    });
};

// Processes Add Survey Page
module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "Surveyor": req.body.Surveyor,
        "Name": req.body.Name,
        "Description": req.body.Description,
        "Published": Date.now.Published,
        "Start": req.body.Start,
        "End": req.body.End,
        "Question1": req.body.Question1,
        "Question2": req.body.Question2,
        "Question3": req.body.Question3,
        "Question4": req.body.Question4,
        "Question5": req.body.Question5,
        "Question6": req.body.Question6,
        "Question7": req.body.Question7,
        "Question8": req.body.Question8
    });

    Survey.create(newSurvey, (err, Survey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Refresh the Survey List
            res.redirect('/survey-list');
        }
    });
};

/*-------------------------------------------------------------*/

// Display Take Survey page
module.exports.displayTakeSurveyPage = (req, res, next) => {
    let id = req.params.id;

    // Find the object to edit by its id
    Survey.findById(id, (err, surveyToTake) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Show the take survey page
            res.render('survey/take', 
            {
                title: 'Take Survey',
                survey: surveyToTake,
                displayName: req.user ? req.user.displayName: ''
            })
        }
    })
};

// Processes Take Survey page
module.exports.processTakeSurveyPage = (req, res, next) => {
    let newAnswers = Answers({
        "Surveyor": req.body.Surveyor,
        "Name": req.body.Name,
        "Description": req.body.Description,
        "Published": req.body.Published,
        "Start": req.body.Start,
        "End": req.body.End,
        "Q1": req.body.Q1,
        "Q2": req.body.Q2,
        "Q3": req.body.Q3,
        "Q4": req.body.Q4,
        "Q5": req.body.Q5,
        "Q6": req.body.Q6,
        "Q7": req.body.Q7,
        "Q8": req.body.Q8,
        "Answer1": req.body.Answer1,
        "Answer2": req.body.Answer2,
        "Answer3": req.body.Answer3,
        "Answer4": req.body.Answer4,
        "Answer5": req.body.Answer5,
        "Answer6": req.body.Answer6,
        "Answer7": req.body.Answer7,
        "Answer8": req.body.Answer8
    });

    Answers.create(newAnswers, (err, Answers) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Refresh the Survey List
            res.redirect('/survey-list/done');
        }
    });
};



/*-------------------------------------------------------------*/

// Displays the Edit Survey Page
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    // Find the object to edit by its id
    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Show the edit page
            res.render('survey/edit', 
            {
                title: 'Edit Survey',
                survey: surveyToEdit,
                displayName: req.user ? req.user.displayName: ''
            })
        }
    })
};

// Processes the Edit Survey Page
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updateSurvey = Survey({
        "_id": id,
        "Name": req.body.Name,
        "Description": req.body.Description,
        "Published": req.body.Published,
        "Start": req.body.Start,
        "End": req.body.End,
        "Question1": req.body.Question1,
        "Question2": req.body.Question2,
        "Question3": req.body.Question3,
        "Question4": req.body.Question4,
        "Question5": req.body.Question5,
        "Question6": req.body.Question6,
        "Question7": req.body.Question7,
        "Question8": req.body.Question8
    })

    Survey.updateOne({_id: id}, updateSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Refresh the Survey List
            res.redirect('/survey-list');
        }
    });
};

/*-------------------------------------------------------------*/

// Performs the Deletion of a survey
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    
    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Refresh the Survey List
            res.redirect('/survey-list');
        }
    });
};

/*-------------------------------------------------------------*/

module.exports.displayDoneSurveyPage = (req, res, next) => {
    res.render('survey/done', 
    {
        title: 'Done Survey',
        displayName: req.user ? req.user.displayName: ''
    });
}