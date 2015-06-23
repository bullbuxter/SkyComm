var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DB');
var schema = new mongoose.Schema({
    name: String,
    email : String,
    pass : String
});
var users = mongoose.model('users', schema);
/* GET home page. */
router.post('/', function(req, res, next) {
    new users({
        name : req.body.name,
        email : req.body.emailR,
        pass : req.body.passR
    }).save(function(err, doc) {
            if(err)
                res.json(err);
            else
                res.redirect('/');
        });
});
module.exports = router;