var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    redirectUrl = '/recharge';
    res.render('recharge', {
        title : 'Recharge',
        sess: (req.session.ide)? req.session.ide : null
    });
});
module.exports = router;