/*
Author: Author: Hong Viet
Team: Team Seven
Course: COMP229 - Fall 2020
Purpose: Team Project - Survey Site
*/ 
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let surveyController = require('../controllers/survey');

// Helper function for guard purposes 
function requireAuth(req, res, next) 
{
    // Checks if the user is logged in

    // If not logged in -> login
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    // If logged in -> continue
    next();
}

// Connect to our surveyModel (Schema)
let Survey = require('../models/survey');


/* GET Route for the Survey List page -- READ Operation */ 
router.get('/', surveyController.displaySurveyList);


/* GET Route for displaying the Add Survey page -- CREATE Operation */ 
router.get('/add', requireAuth, surveyController.displayAddPage);

/* POST Route for processing the Add Survey page -- CREATE Operation */ 
router.post('/add', requireAuth, surveyController.processAddPage);


/* GET Route for displaying the Take Survey page -- CREATE Operation */ 
router.get('/take/:id' , surveyController.displayTakeSurveyPage);

/* POST Route for processing the Take Survey page -- CREATE Operation */ 
router.post('/take/:id', surveyController.processTakeSurveyPage);


/* GET Route for displaying the Edit Survey page -- UPDATE Operation */ 
router.get('/edit/:id', requireAuth, surveyController.displayEditPage);

/* POST Route for processing the Edit Survey page -- UPDATE Operation */ 
router.post('/edit/:id', requireAuth, surveyController.processEditPage);

/* GET Route to perform Survey Deletion -- DELETE Operation */ 
router.get('/delete/:id', requireAuth, surveyController.performDelete);


module.exports = router;