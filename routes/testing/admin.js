var express = require('express');
var router = express.Router();
var db = require('../../models/database');
router.get('/usedata', function(req, res, next) {
    res.render('testing/usedata', {
       title: 'ADMIN PAGE',
        req: req,
        res: res
    });
});
router.post('/result', function(req, res, next) {
    var name = req.body.user, data = Number(req.body.data), days = Number(req.body.days);
    var mb = data / days;
    db.updateDataTotal(name, data, days);
    for(var i = 1; i <= days; i++) {
        db.updateDataInterval(name, mb);
    }
    res.send('<h1>Done</h1>');
    res.end();
});
module.exports = router;