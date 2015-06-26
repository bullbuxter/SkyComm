var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mailer = require('../models/mailer');
mongoose.connect('mongodb://localhost/DB');
var schema = new mongoose.Schema({
    name: String,
    email : String,
    pass : String,
    isActive: Boolean
});
var users = mongoose.model('users', schema);
/* Route the signup page */
router.post('/signup', function(req, res, next) {
    users.find({email: req.body.emailR}, function(err, doc) {
        if (err)
            res.json(err);
        else if (doc[0] != null) {
            res.render('message', {
                title: 'MESSAGE',
                msg: 'User with email id ' + req.body.emailR + ' already exists. You may want to consider Signin option',
                res: res
            });
        } else {
            new users({
                name: req.body.name,
                email: req.body.emailR,
                pass: req.body.passR,
                isActive: false
            }).save(function (err, doc) {
                    if (err)
                        res.json(err);
                    else {
                        //mailer.sendMail(req.body.email);
                        res.render('message', {
                            title: 'MESSAGE',
                            msg: 'Registration successful. Please activate your account by clicking the link in the mail sent to ' + req.body.emailR,
                            res: res,
                            req: req
                        });
                    }
                });
        }
    });
});

isMatch = function(user, req, res) {
    var one = req.body.email;
    var two = req.body.pass;
    if(one == user.email && two == user.pass) {
        if (user.isActive) {
            req.session.ide = user;
            res.cookie('revalidate', false);
            res.redirect(req.cookies.redirect);
        } else {
            res.render('message', {
                title: 'MESSAGE',
                msg: 'You haven\'t activated your account yet. Please do so by clicking on the link in the mail sent to ' + one,
                res: res
            });
        }
    } else {
        res.render('message', {
            title: 'MESSAGE',
            msg: 'The email-id / password combination is not correct. Please try again.',
            res: res
        });
    }
};
/* Route the signin page */
router.post('/signin', function(req, res, next) {
    users.find({email: req.body.email}, function(err, doc) {
        if(err)
            res.json(err);
        else if(doc[0] == null) {
            res.render('message', {
                title: 'MESSAGE',
                msg: 'User with email id ' + req.body.email + ' doesn\'t exist. Try again or Sign Up.',
                res: res
            });
        } else isMatch(doc[0],req, res);
        res.end();
    });
});
/*Rout the logout page */
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
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});
module.exports = router;