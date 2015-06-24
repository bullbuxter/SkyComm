var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    redirectUrl = '/offers';
    res.render('offers', {
        title: "Offers",
        sess: (req.session.ide)? req.session.ide : null
    });
});

module.exports = router;