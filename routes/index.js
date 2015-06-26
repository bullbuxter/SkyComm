var express = require('express');
var router = express.Router();
var list = require('../models/UserData.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    redirectUrl = '/';
    res.render('index', {
        title: 'Home',
        users: list,
        sess: (req.session.ide)? req.session.ide : null
    });
});
module.exports = router;