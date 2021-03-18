var express = require('express');
var router = express.Router();

const OrganizationLogic = require('../modules/logic/organizationlogic')
const Formatter = require('../modules/util/formatter')


router.post('/create', function (req, res){
  let org = req.body;

  OrganizationLogic.create(org).then(function (savedOrg)
  {
    savedOrg = Formatter.removeXSS(savedOrg);
    res.send(savedOrg);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('', function (req, res){

  OrganizationLogic.findAll().then(function (orgs)
  {
    orgs = Formatter.removeXSS(orgs);
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
    org = Formatter.removeXSS(org);
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
    savedOrg = Formatter.removeXSS(savedOrg);
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
    result = Formatter.removeXSS(result);
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

module.exports = router;
