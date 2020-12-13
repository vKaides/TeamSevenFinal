let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//define user model instance
let usermodel = require('../models/user');
let user = usermodel.User; //alias

module.exports.displayHomePage = (req, res, next) =>{
    res.render('index', {title: "Home", displayName: req.user ? req.user.displayName:''});
}

module.exports.displayListPage = (req, res, next) =>{
    res.render('list.ejs', { title: 'List Page', displayName: req.user ? req.user.displayName:'' });
}
module.exports.displayLoginPage = (req,res,next) =>
{
    //check if the user already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
            title: "Login",
            messages:req.flash('loginMessage'),
            displayName : req.user ? req.user.displayName : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}
module.exports.processLoginPage = (req,res,Next) =>{
    passport.authenticate ('local',
    (err,user,info) => {
        //server err?
        if(err)
        {
            return next(err);
        }
        //is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');

        }
        req.login(user, (err) =>{
            //server error?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/survey-list');
        })
    })(req,res,Next);
    
}
module.exports.displayRegisterPage = (req,res,next) =>
{
    //check if user is already logged in
    if(!req.user)
    {
        res.render('auth/register',{
            title:'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName:''
        });
    }
    else
    {
        return res.redirect('/');
    }
}
module.exports.processRegisterPage = (req,res,next) =>
{
    //instantiate a user object
    let newuser = new user({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });
    user.register(newuser, req.body.password, (err) =>{
if(err)
{
    console.log("Error: Inserting New User");
    if(err.name == "UserExistsError")
    {
req.flash(
    'registerMessage',
    'Registration Error: User Already Exists!'
);
console.log("Error: User Already Exists!")
    }
    return res.render('auth/register',{
        title:'Register',
        messages: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName:''
    });
    
}
else{
    //if no error exists,then registration is successful

    //redirect the user and authenticate them
    return passport.authenticate('local')(req,res, () =>{
 res.redirect('/survey-list')
    });
}
    });
}
module.exports.performLogout = (req,res,next) => {
    req.logout();
    res.redirect('/');
}