var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.cookie('redirect', '/dataUsage');
    res.render('dataUsage', {
        title : 'Data Tracker',
        req: req,
        res: res,
        user: req.session.user
    });
});
module.exports = router;