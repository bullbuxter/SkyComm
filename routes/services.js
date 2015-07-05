var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.cookie('redirect', '/services');
    res.render('services', {
        title : 'Services',
        req: req,
        res: res,
        user: req.session.user
    });
});
module.exports = router;