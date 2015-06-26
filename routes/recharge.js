var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.cookie('redirect', '/recharge');
    res.render('recharge', {
        title : 'Recharge',
        req: req,
        res: res
    });
});
module.exports = router;