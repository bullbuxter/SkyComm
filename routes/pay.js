var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    redirectUrl = '/pay';
    res.render('pay', {
        title : 'Pay',
        sess: (req.session.ide)? req.session.ide : null
    });
});
module.exports = router;