var express = require('express');
var router = express.Router();

const CityLogic = require('../modules/logic/citylogic')
const Formatter = require('../modules/util/formatter')

/* GET Citys listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/:countrycode', function (req, res){

  let countryCode = req.params.countrycode;
  CityLogic.findAll(countryCode).then(function (cities)
  {
    cities = Formatter.removeXSS(cities);
    res.send(cities);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    CityLogic.get(id).then(function (city)
    {
      city = Formatter.removeXSS(city);
      res.send(city);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.get('/search/:keyword', function (req, res){
    let keyword = req.params.keyword;
  
    CityLogic.findByKeyword(keyword).then(function (cities)
    {
      cities = Formatter.removeXSS(cities);
      res.send(cities);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})



module.exports = router;
