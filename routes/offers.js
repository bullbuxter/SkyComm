var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.cookie('redirect', '/offers');
    res.render('offers', {
        title: "Offers",
        req: req,
        res: res
    });
});

module.exports = router;