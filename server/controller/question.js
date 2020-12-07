/*
Author: Author: Hong Viet
Team: Team Seven
Course: COMP229 - Fall 2020
Purpose: Team Project - Survey Site
*/ 
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const question = require('../models/question');

// create a reference to the model
let Question = require('../models/question');



module.exports.displayQuestionList = (req, res, next) => {
    Question.find((err, questionList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            

            res.render('question/list',
             {title: 'question',
             QuestionList: questionList,
               displayName: req.user ? req.user.displayName : ``});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('/:id/question/add', {title: 'Add Contact',
    displayName: req.user ? req.user.displayName : ``})          
}

module.exports.processAddPage = (req, res, next) => {
    let newQuestion = Question({
        "name": req.body.name,
        "answer": req.body.answer
        
    });

    Question.create(newQuestion, (err, Question) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the Question list
            res.redirect('/:id/question-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Question.findById(id, (err, questionToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('question/edit', {title: 'Edit Question', question: questionToEdit,
            displayName: req.user ? req.user.displayName : ``})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedQuestion = Question({
        "_id": id,
        "name": req.body.name,
        "answer": req.body.answer
        
    });

    question.updateOne({_id: id}, updatedQuestion, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the Question  list
            res.redirect('/question-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Question.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the Question  list
             res.redirect('/question-list');
        }
    });
}