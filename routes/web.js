var express = require('express');
var router = express.Router();
const path = require('path');


router.get('/registeruser', function (req, res){
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "userregistration");
    res.render(p )
})

router.get('/userlist', function (req, res){
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "userlist");
    res.render(p )
})

router.get('/registerapp', function (req, res){
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "appregistration");
    res.render(p )
})

router.get('/applist', function (req, res){
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "applist");
    res.render(p )
})

router.get('/registerappuser', function (req, res){
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "appuserregistration");
    res.render(p )
})

router.get('/orglist', function (req, res){
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "orglist");
    res.render(p )
})

router.get('/registerorg', function (req, res){
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "orgregistration");
    res.render(p )
})


router.get('/login', function (req, res){
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "login");
    res.render(p )
})


module.exports = router;