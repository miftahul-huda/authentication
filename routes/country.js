var express = require('express');
var router = express.Router();

const CountryLogic = require("../modules/logic/countrylogic");


router.get('/', function (req, res){

  CountryLogic.findAll().then(function (countries)
  {
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
      res.send(countries);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})



module.exports = router;
