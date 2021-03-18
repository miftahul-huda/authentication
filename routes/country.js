var express = require('express');
var router = express.Router();

const CountryLogic = require("../modules/logic/countrylogic");
const Formatter = require('../modules/util/formatter')

router.get('/', function (req, res){

  CountryLogic.findAll().then(function (countries)
  {
    countries = Formatter.removeXSS(countries);
    res.send(countries)
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    CountryLogic.get(id).then(function (country)
    {
      country = Formatter.removeXSS(country);
      res.send(country);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.get('/search/:keyword', function (req, res){
    let keyword = req.params.keyword;
  
    CountryLogic.findByKeyword(keyword).then(function (countries)
    {
      countries = Formatter.removeXSS(countries);
      res.send(countries);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})



module.exports = router;
