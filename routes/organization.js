var express = require('express');
var router = express.Router();

const OrganizationLogic = require('../modules/logic/organizationlogic')


router.post('/create', function (req, res){
  let org = req.body;

  OrganizationLogic.create(org).then(function (savedOrg)
  {
    res.send(savedOrg);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/', function (req, res){

  OrganizationLogic.findAll().then(function (orgs)
  {
    res.send(orgs);
  }).catch(function (err){
    console.log("error")
    console.log(err)
    res.send(err);
  })
})


router.get('/get/:id', function (req, res){
  let id = req.params.id;

  OrganizationLogic.get(id).then(function (org)
  {
    res.send(org);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.post('/update/:id', function (req, res){
  let org = req.body;
  let id = req.params.id;

  OrganizationLogic.update(id, org).then(function (savedOrg)
  {
    res.send(savedOrg);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  OrganizationLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

module.exports = router;
