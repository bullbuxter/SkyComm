var express = require('express');
var router = express.Router();
var db = require('../models/database');
router.get('/overview', function(req, res, next) {
    if(req.session.user) {
        res.render('profile/overview', {
            title: 'OVERVIEW',
            res: res,
            req: req,
            user: req.session.user
        });
    } else
        res.redirect(req.cookies.redirect);
});
router.get('/data', function(req, res, next) {
    if(req.session.user) {
        res.render('profile/data', {
            title: 'Track your Data',
            res: res,
            req: req,
            user: req.session.user
        });
    } else
        res.redirect(req.cookies.redirect);
});
router.post('/edit', function(req, res) {
    db.updateUser(req.session.user._id, req.body.fname, req.body.lname, req.body.mob, req.body.pin, req.body.address, function(result) {
        if(result) {
            db.getUserData(req.session.user.email,function(err, result) {
                if(err)
                    console.log(err);
                else
                    req.session.user = result;
                res.redirect('/profile/overview');
            });
        } else
            res.redirect('/profile/overview');
    });
});
router.get('/settings', function(req, res) {
    if(req.session.user) {
            res.render('profile/settings', {
                title: 'Personal Settings',
                res: res,
                req: req,
                user: req.session.user
            });
    } else
        res.redirect(req.cookies.redirect);
});
router.post('/authedit', function(req, res) {
   if(req.session.user) {
       if(req.query.mode == 'email') {
           db.updateEmail(req.session.user._id, req.body.new_id);
           req.session.destroy(function(err) {
               if(err)
               console.log(err);
               else
                   res.redirect(req.cookies.redirect);
           });
       } else if(req.query.mode == 'password') {
           db.updatePasswd(req.session.user._id, req.body.new_pswd);
           req.session.destroy(function(err) {
               if(err)
                   console.log(err);
               else
                   res.redirect(req.cookies.redirect);
           });
       } else {
           res.render('error', {
               message: 'Page doesn\'t exist. Trying to access SkyComm?',
               error: {status: 404}
           });
       }
   } else
       res.redirect(req.cookies.redirect);
});
module.exports = router;