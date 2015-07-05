var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.cookie('redirect', '/');
    res.cookie('revalidate', true);
    res.render('index', {
        title: 'Home',
        res: res,
        req: req,
        user: req.session.user
    });
});

module.exports = router;