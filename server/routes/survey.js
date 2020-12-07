
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const book = require('../models/survey');
let passport = require('passport');
// Connect to our surveyModel (Schema)
let Survey = require('../models/survey');






/* GET Route for the Survey List page -- READ Operation */ 
router.get('/', (req, res, next) => {
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
                SurveyList: surveyList
            });
            //console.log(SurveyList);
        }
    })
});

/* GET Route for displaying the Add Survey page -- CREATE Operation */ 
router.get('/add', (req, res, next) => {
    res.render('survey/add', 
    {
        title: 'Add Survey'
    });
})


/* POST Route for processing the Add Survey page -- CREATE Operation */ 
router.post('/add', (req, res, next) => {
    let newSurvey = Survey({
        "Name": req.body.Name,
        "Description": req.body.Description,
        "Published": req.body.Published,
        "Start": req.body.Start,
        "End": req.body.End
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
})


/* GET Route for displaying the Edit Survey page -- UPDATE Operation */ 
router.get('/edit/:id', (req, res, next) => {
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
                survey: surveyToEdit
            })
        }
    })

})


/* POST Route for processing the Edit Survey page -- UPDATE Operation */ 
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updateSurvey = Survey({
        "_id": id,
        "Name": req.body.Name,
        "Description": req.body.Description,
        "Published": req.body.Published,
        "Start": req.body.Start,
        "End": req.body.End
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
})


/* GET Route to perform Survey Deletion -- DELETE Operation */ 
router.get('/delete/:id', (req, res, next) => {
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
})


module.exports = router;