var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});
router.get('/student/register', function(req, res, next) {
  res.render('./student/register', { title: 'Register' });
});
router.get('/teacher/register', function(req, res, next) {
  res.render('./teacher/register', { title: 'Register' });
});

module.exports = router;
