var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.cookie('redirect', '/about');
    res.render('about', {
        title : 'About',
        req: req,
        res: res,
        user: req.session.user
    });
});
module.exports = router;