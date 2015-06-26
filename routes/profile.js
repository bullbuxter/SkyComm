var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    if(req.session.ide) {
        res.render('profile', {
            title: 'Profile',
            req: req,
            res: res
        });
    } else
        res.redirect(req.cookies.redirect);
});

module.exports = router;