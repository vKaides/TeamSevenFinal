/*
Author: Author: Hong Viet
Team: Team Seven
Course: COMP229 - Fall 2020
Purpose: Team Project - Survey Site
*/ 
let express = require('express');
let router = express.Router();
let indexController = require('../controller/index');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', 
  { title: 'Home'});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', 
  { title: 'Home'});
});
/*Get Route for Displaying Login page */
router.get('/login', indexController.displayLoginPage);
/*Post Route for Processing Login page*/
router.post('/login', indexController.processLoginPage);
/*Get Route for Displaying Register page */
router.get('/register', indexController.displayRegisterPage);
/*Post Route for Processing Register page*/
router.post('/register', indexController.processRegisterPage);
/*Get to perform UserLogout*/
router.get('/logout', indexController.performLogout);
/* GET survey-list page. */
/*
router.get('/survey-list', function(req, res, next) {
  res.render('index', 
  { title: 'Survey List'});
});
*/

module.exports = router;
