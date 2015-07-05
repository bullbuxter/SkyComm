var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.cookie('redirect', '/contact');
    res.render('contact', {
        title : 'Contact',
        req: req,
        res: res,
        user: req.session.user
    });
});
module.exports = router;