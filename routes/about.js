var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    redirectUrl = '/about';
    res.render('about', {
        title : 'About',
        sess: (req.session.ide)? req.session.ide : null
    });
});
module.exports = router;