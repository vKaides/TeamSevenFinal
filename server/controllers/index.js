let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// Define the User Model Instance
let userModel = require('../models/user');
let User = userModel.User; // Alias

// Home
module.exports.displayHomePage = (req, res, next) => {
    res.render('home', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

// Surveys
module.exports.displaySurveysPage = (req, res, next) => {
    res.render('index', {title: 'Survey List', displayName: req.user ? req.user.displayName : ''});
}

// Display the login page
module.exports.displayLoginPage = (req, res, next) => {
    // Checks if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}
// Process the login page
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // if we get a server error?
        if(err)
        {
            return next(err);
        }
        //is there a login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server error
            if(err)
            {
                return next(err);
            }
            return res.redirect('/survey-list');
        });
    })(req, res, next);
}
// Display the register page
module.exports.displayRegisterPage = (req, res, next) => {
    // Cecks if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',       
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}
// Process the register page
module.exports.processRegisterPage = (req, res, next) => {
    // Instantiate a user object
    let newUser = new User({
        username: req.body.username,
        // password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage', 
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!');
            }
            return res.render('auth/register', {
                title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
            })
        }
        else
        {
            // if no error exists, then registration is successful
            // redirect the user and authenticate them

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/survey-list')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

