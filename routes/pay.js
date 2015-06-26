var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.cookie('redirect', '/pay');
    res.render('pay', {
        title : 'Pay',
        req: req,
        res: res
    });
});
module.exports = router;