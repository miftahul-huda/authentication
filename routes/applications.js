var express = require('express');
var router = express.Router();

const ApplicationLogic = require('../modules/logic/applicationlogic')
const ApplicationUserLogic = require('../modules/logic/applicationuserlogic')


router.post('/register', function (req, res){
  let application = req.body;
  console.log(application);

  ApplicationLogic.register(application).then(function (savedApplication)
  {
    res.send(savedApplication);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/', function (req, res){

  ApplicationLogic.findAll().then(function (applications)
  {
    
    res.send(applications);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.post('/', function (req, res){
  let search = req.body;

  ApplicationLogic.findAll(search).then(function (savedApplication)
  {
    res.send(savedApplication);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/get/:id', function (req, res){
  let id = req.params.id;

  ApplicationLogic.get(id).then(function (application)
  {
    res.send(application);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.post('/update/:id', function (req, res){
  let application = req.body;
  let id = req.params.id;

  ApplicationLogic.update(id, application).then(function (savedApplication)
  {
    res.send(savedApplication);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  ApplicationLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/deleteall', function (req, res){
  let id = req.params.id;

  ApplicationUserLogic.deleteAll().then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

module.exports = router;
