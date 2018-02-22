'use strict'
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SIMS - Welcome to School Management System' , layout: 'preLoginLayout'});
});

module.exports = router;
