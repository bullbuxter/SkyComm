var express = require('express');
var router = express.Router();
var list = require('../models/UserData.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.cookie('redirect', '/myaccount');
    res.render('myaccount', {
        title: 'My Account',
        sess: (req.session.ide)? req.session.ide : null,
        req: req,
        res: res,
        user: req.session.user
    });
});

module.exports = router;