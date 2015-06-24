var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    redirectUrl = '/contact';
    res.render('contact', {
        title : 'Contact',
        sess: (req.session.ide)? req.session.ide : null
    });
});
module.exports = router;