var express = require('express');
var router = express.Router();
var db = require('../models/database');

/* Route the signup page */
router.post('/signup', function(req, res) {
    db.getUserData(req.body.emailR, function(err, result) {
        if(err)
            displayMessage(res, 'Oops.. Something went wrong. Account not created. Please report the problem.');
        else if(result)
            displayMessage(res, 'User with email id ' + req.body.emailR + ' already exists. You may want to consider Signin option');
        else {
            db.createUser(req.body.emailR, req.body.passR, req.body.fname, req.body.lname, req.body.phone, function(result) {
                if(result)
                    displayMessage(res, 'Registration successful. Please activate your account by clicking the link in the mail sent to ' + req.body.emailR);
                else
                    displayMessage(res, 'Oops.. Something went wrong. Account not created. Please report the problem.');
            });
        }
    });
});
/* Route the signin page */
router.post('/signin', function(req, res) {
    db.getUserData(req.body.email, function(err, result) {
       if(err)
           displayMessage(res, 'Oops.. Something went wrong. Account not created. Please report the problem.');
       else if(result) {
           if(result.passwd == req.body.pass) {
               if(result.isActive) {
                   req.session.user = result;
                   res.cookie('revalidate', false);
                   res.redirect(req.cookies.redirect);
               } else
                   displayMessage(res, 'You haven\'t activated your account yet. Please do so by clicking on the link in the mail sent to ' + req.body.email);
           } else
               displayMessage(res, 'The email-id / password combination is not correct. Please try again.');
       } else
           displayMessage(res, 'User with email id ' + req.body.email + ' doesn\'t exist. Try again or Sign Up.');
    });
});
//Routing the logout page
router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        if (err)
            console.log(err);
        else {
            res.cookie('revalidate', false);
            res.redirect(req.cookies.redirect);
        }
    });
});
// Routing the activation page
router.get('/success', function(req, res) {
   if(req.query.email && req.query.front) {
       db.toActivate(req.query.email, req.query.front, function(err, result) {
           if(err)
               displayMessage(res, 'Oops.. Something went wrong. Account not activated. Please report the problem.');
           else if(result)
               displayMessage(res, 'Activation successful. Please signin');
           else
               displayMessage(res, 'Oops something went wrong. Make sure you copy the correct URL. If you did, please report the problem.');
       });
   } else {
       res.render('error', {
           message: 'Page doesn\'t exist. Trying to access SkyComm?',
           error: {status: 404}
       });
   }
});
function displayMessage(res, info) {
    res.render('message', {
       title: 'MESSAGE',
        msg: info,
        res: res
    });
}
module.exports = router;