/*
Author: Author: Hong Viet
Team: Team Seven
Course: COMP229 - Fall 2020
Purpose: Team Project - Survey Site
*/ 
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport =require(`passport`);
let questionController = require(`../controller/question`);

//helper function for guard purposes 
function requireAuth(req, res, next)
{
    //check if the user if they logged in
    if(!req.isAuthenticated()){
        return res.redirect(`/login`);
    }
    next();
}



/* GET Route for the question List page - READ Operation */
router.get('/:id',requireAuth, questionController.displayQuestionList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/:id/add',requireAuth, questionController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/:id/add',requireAuth, questionController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/:id/edit/:id',requireAuth, questionController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/:id/edit/:id',requireAuth, questionController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/:id/delete/:id',requireAuth, questionController.performDelete);

module.exports = router;