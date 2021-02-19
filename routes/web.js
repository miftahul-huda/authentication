var express = require('express');
var router = express.Router();
const path = require('path');


router.get('/registeruser', function (req, res){

    let appSession = req.session;

    if(appSession != null && appSession.loggedInUser != null && appSession.loggedInUser.isadmin != null)
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "userregistration");
        res.render(p )
    }
    else
    {
        res.redirect("login?admin=1&page=registeruser")
    }

})

router.get("", function(req, res){
    res.redirect("userlist");
});

router.get('/userlist', function (req, res){

    let appSession = req.session;
    if(appSession != null && appSession.loggedInUser != null && appSession.loggedInUser.isadmin != null)
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "userlist");
        res.render(p )
    }
    else
    {
        res.redirect("login?admin=1&page=userlist")
    }
})

router.get('/registerapp', function (req, res){

    let appSession = req.session;
    if(appSession != null && appSession.loggedInUser != null && appSession.loggedInUser.isadmin != null)
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "appregistration");
        res.render(p )
    }
    else
    {
        res.redirect("login?admin=1&page=registerapp")
    }
})

router.get('/applist', function (req, res){

    let appSession = req.session;
    if(appSession != null && appSession.loggedInUser != null && appSession.loggedInUser.isadmin != null)
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "applist");
        res.render(p )
    }
    else
    {
        res.redirect("login?admin=1&page=applist")
    }

})

router.get('/registerappuser', function (req, res){
    let appSession = req.session;
    if(appSession != null && appSession.loggedInUser != null && appSession.loggedInUser.isadmin != null)
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "appuserregistration");
        res.render(p )
    }
    else
    {
        res.redirect("login?admin=1&page=registerappuser")
    }
})

router.get('/orglist', function (req, res){
    let appSession = req.session;
    if(appSession != null && appSession.loggedInUser != null && appSession.loggedInUser.isadmin != null)
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "orglist");
        res.render(p )
    }
    else
    {
        res.redirect("login?admin=1&page=orglist")
    }
})

router.get('/registerorg', function (req, res){
    let appSession = req.session;
    if(appSession != null && appSession.loggedInUser != null && appSession.loggedInUser.isadmin != null)
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "orgregistration");
        res.render(p )
    }
    else
    {
        res.redirect("login?admin=1&page=registerorg")
    }
})


router.get('/login', function (req, res){
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "login");
    res.render(p )
})

router.get('/logout', function (req, res){
    let appSession = req.session;
    appSession.loggedInUser = null;
    res.redirect("login");
})


module.exports = router;