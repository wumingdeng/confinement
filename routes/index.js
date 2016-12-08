var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/setDisplay', function(req, res, next) {
  res.render('setDisplay', { title: 'Express' });
});

router.get('/setGlobal', function(req, res, next) {
  res.render('setGlobal', { title: 'Express' });
});

router.get('/setTechnician', function(req, res, next) {
  res.render('setTechnician', { title: 'Express' });
});

router.get('/technicianDetail', function(req, res, next) {
  res.render('technicianDetail', { title: 'Express' });
});

router.get('/serviceDetail', function(req, res, next) {
  res.render('serviceDetail', { title: 'Express' });
});

router.get('/setService', function(req, res, next) {
  res.render('setService', { title: 'Express' });
});

router.get('/setOrder', function(req, res, next) {
  res.render('setOrder', { title: 'Express' });
});

router.get('/out', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;