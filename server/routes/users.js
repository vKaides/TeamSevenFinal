/*
Author: Author: Hong Viet
Team: Team Seven
Course: COMP229 - Fall 2020
Purpose: Team Project - Survey Site
*/ 
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
