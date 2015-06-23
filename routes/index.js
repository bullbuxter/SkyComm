var express = require('express');
var router = express.Router();
var list = require('../models/UserData.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session;
  if(sess.ide) {
    res.render('index', {
      title: 'Home',
      users: list,
      name: sess.ide
    });
  } else {
    res.render('index', {
      title: 'Home',
      users: list,
      name: null
    });
  }
});

module.exports = router;