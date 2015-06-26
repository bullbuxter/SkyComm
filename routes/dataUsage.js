var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.cookie('redirect', '/dataUsage');
    res.render('dataUsage', {
        title : 'Data Tracker',
        req: req,
        res: res
    });
});
module.exports = router;