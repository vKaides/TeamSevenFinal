let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//Create a reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
  if(err)
  {
      return console.error(err);
  }
  else
  {
      //console.log(SurveyList);
      res.render('survey/list', {title: 'Survey', 
      SurveyList: surveyList, 
      displayName: req.user ? req.user.displayName : ''});
  }
    });
}
module.exports.displayAddPage = (req, res, next) =>
{
  res.render('survey/add', {title: 'Add Survey',
  displayName: req.user ? req.user.displayName : ''});

}
module.exports.processAddPage = (req, res, next) =>
{
let newsurvey = Survey({
    "name" : req.body.name,
    "description": req.body.description,
    "published": req.body.published,
    "start": req.body.start,
    "end": req.body.end,
});
Survey.create(newsurvey, (err, Survey) =>{
if(err)
{
console.log(err);
res.end(err);
}
else
{
  //refresh the Survey list
  res.redirect('/survey-list');
}
});
}
module.exports.displayEditPage = (req, res, next) =>
{
let id = req.params.id;
Survey.findById(id, (err, surveyToEdit) =>
{
if(err){
  console.log(err);
res.end(err);
}
else{
  //show edit view
  res.render('survey/edit', {title: 'Edit Survey', survey: surveyToEdit,
  displayName: req.user ? req.user.displayName : ''})
}
});
}
module.exports.processEditPage = (req, res, next) =>
{
let id =req.params.id

let updateSurvey = Survey({
  "_id": id,
  "name" : req.body.name,
  "description": req.body.description,
  "published": req.body.published,
  "start": req.body.start,
  "end": req.body.end,
});
Survey.updateOne({_id: id}, updateSurvey, (err) =>{
if(err)
{
  console.log(err);
res.end(err);
}
else
{
  // refresh the Survey list
  res.redirect('/survey-list');
}
});
}
module.exports.performDelete = (req, res, next) =>
{
  let id =req.params.id;

  Survey.remove({_id: id}, (err) =>{
if(err){
  console.log(err);
res.end(err);
}
else{
  // refresh the Survey list
  res.redirect('/survey-list');
}
  });
}
