var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
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
    new users({
        name : req.body.name,
        email : req.body.emailR,
        pass : req.body.passR,
        isActive: false
    }).save(function(err, doc) {
            if(err)
                res.json(err);
            else
                res.redirect('/');
        });
});

isMatch = function(user, req, res) {
    var one = req.body.email;
    var two = req.body.pass;
    if(one == user.email && two == user.pass){
        sess = req.session;
        sess.ide = user.name;
        res.redirect('/');
    }
    else {
        res.send("Email/Password combination not correct");
    }
};
/* Route the signin page */
router.post('/signin', function(req, res, next) {
    users.find({email: req.body.email}, function(err, doc) {
        if(err)
            res.json(err);
        else if(doc[0] == null) {
            res.send("User with email " + req.body.email + " does not exist.");
        } else
            isMatch(doc[0],req, res);
        res.end();
    });
});
/*Rout the logout page */
router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        if (err)
            console.log(err);
        else
            res.redirect('/');
    });
});
module.exports = router;