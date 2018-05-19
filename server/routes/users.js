var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true })
);

module.exports = router;
