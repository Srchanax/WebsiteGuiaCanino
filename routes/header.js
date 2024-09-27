const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
  res.render('./partials/header')
})

module.exports = router;