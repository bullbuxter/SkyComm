var express = require('express');
var router = express.Router();
var list = require('../models/UserData.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.cookie('redirect', '/');
    res.cookie('revalidate', true);
    res.render('index', {
        title: 'Home',
        users: list,
        sess: (req.session.ide)? req.session.ide : null,
        req: req,
        res: res
    });
});

module.exports = router;