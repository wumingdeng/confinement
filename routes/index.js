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

router.get('/technicianApproval', function(req, res, next) {
  res.render('technicianApproval', { title: 'Express' });
});

router.get('/modifyTechnician', function(req, res, next) {
  res.render('modifyTechnician', { title: 'Express' });
});

router.get('/serviceDetail', function(req, res, next) {
  res.render('serviceDetail', { title: 'Express' });
});

router.get('/setService', function(req, res, next) {
  res.render('setService', { title: 'Express' });
});

router.get('/orderList', function(req, res, next) {
  res.render('orderList', { title: 'Express' });
});

router.get('/setOrder', function(req, res, next) {
  res.render('setOrder', { title: 'Express' });
});

router.get('/withdrawList', function(req, res, next) {
  res.render('withdrawList', { title: 'Express' });
});

router.get('/withdrawApproval', function(req, res, next) {
  res.render('withdrawApproval', { title: 'Express' });
});

router.get('/setCount', function(req, res, next) {
  res.render('setCount', { title: 'Express' });
});

router.get('/countList', function(req, res, next) {
  res.render('countList', { title: 'Express' });
});

router.get('/setUsers', function(req, res, next) {
  res.render('setUsers', { title: 'Express' });
});

router.get('/setAntenatal', function(req, res, next) {
  res.render('setAntenatal', { title: 'Express' });
});

router.get('/setFeedbackTemplate', function(req, res, next) {
  res.render('setFeedbackTemplate', { title: 'Express' });
});

router.get('/antenatalList', function(req, res, next) {
  res.render('antenatalList', { title: 'Express' });
});

router.get('/antenatalDo', function(req, res, next) {
  res.render('antenatalDo', { title: 'Express' });
});

router.get('/out', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
