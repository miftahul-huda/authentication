var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('', function(req, res, next) {
  //res.redirect("/web/userlist")
  res.send("Welcome")
});

module.exports = router;
