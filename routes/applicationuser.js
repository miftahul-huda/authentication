var express = require('express');
var router = express.Router();

const ApplicationUserLogic = require('../modules/logic/applicationuserlogic')



router.post('/register', function (req, res){
  let appUser = req.body;
  console.log(appUser);

  ApplicationUserLogic.register(appUser).then(function (savedappUser)
  {
    res.send(savedappUser);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})


router.get('/delete/:appId/:userId', function (req, res){
  let appId = req.params.appId;
  let userId = req.params.userId;

  ApplicationUserLogic.delete(appId, userId).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

module.exports = router;
