
const router = require('express').Router();
const models = require('../models');

router.get('/', function(req, res, next) {
  res.render('index');
})

module.exports = router;