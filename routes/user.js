var express = require('express');
var router = express.Router();

const UserLogic = require('../modules/logic/userlogic')
const ApplicationUserLogic = require('../modules/logic/applicationuserlogic')
const Formatter = require('../modules/util/formatter')

router.post('/register', function (req, res){
    let user = req.body;
    console.log(user);
    let fullName  = user.fullname;
    let firstnames = fullName.split(" ");
    let lastname = "";
    if(firstnames.length >= 1)
        firstname = firstnames[0];
    if(firstnames.length >= 2)
        lastname = firstnames[1];
    user.firstname = firstname;
    user.lastname = lastname;

    UserLogic.register(user).then(function (saveduser)
    {
        saveduser = Formatter.removeXSS(saveduser);
        res.send(saveduser);
    }).catch(function (err){
        console.log("error")
        console.log(err);
        res.send(err);
    })
})

router.get('/', function (req, res){

  let appSession = req.session;
  if(appSession != null && appSession.loggedInUser != null && appSession.loggedInUser.isadmin != null)
  {
    UserLogic.findAll().then(function (users)
    {
        users = Formatter.removeXSS(users);
        res.send(users);
    }).catch(function (err){
        console.log("error")
        console.log(err);
        res.send(err);
    })
  }
  else
  {
    res.send("<b>404</b>");
  }
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;

    let appSession = req.session;
    if(appSession != null && appSession.loggedInUser != null && appSession.loggedInUser.isadmin != null)
    {
      UserLogic.get(id).then(function (user)
      {
        user = Formatter.removeXSS(user);
        res.send(user);
      }).catch(function (err){
        console.log("error")
        res.send(err);
      })
    }
    else
    {
      res.send("<b>404</b>");
    }
})

router.get('/search/:keyword', function (req, res){
    let keyword = req.params.keyword;

    let appSession = req.session;
    if(appSession != null && appSession.loggedInUser != null && appSession.loggedInUser.isadmin != null)
    {
      UserLogic.findByKeyword(keyword).then(function (users)
      {
        users = Formatter.removeXSS(users);
        res.send(users);
      }).catch(function (err){
        console.log("error")
        res.send(err);
      })
    }
    else
    {
      res.send("<b>404</b>");
    }
})

router.post('/login', function (req, res){
    let user = req.body;
  
    UserLogic.login(user.email, user.password).then(function (saveduser)
    {
      saveduser = Formatter.removeXSS(saveduser);
      res.send(saveduser);
    }).catch(function (err){
      console.log("error")
      console.log(err)
      res.send(err);
    })
})

router.post('/loginbyapp', function (req, res){
    let user = req.body;
    let appSession = req.session;

    console.log("loginbyapp --- " + JSON.stringify(user));

    UserLogic.loginByApp(user.email, user.password, user.appId).then(function (saveduser)
    {
      appSession.loggedInUser = saveduser.payload;
      saveduser = Formatter.removeXSS(saveduser);
      res.send(saveduser);

    }).catch(function (err){
      console.log("error")
      console.log(err);
      res.send(err);
    })

})



router.post('/loginbyemail', function (req, res){
  let user = req.body;
  let appSession = req.session;

  UserLogic.loginByEmail(user.email).then(function (saveduser)
  {
    appSession.loggedInUser = saveduser.payload;
    saveduser = Formatter.removeXSS(saveduser);
    res.send(saveduser);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.post('/update/:id', function (req, res){
  let user = req.body;
  let id = req.params.id;
  let appSession = req.session;
  if(appSession != null && appSession.loggedInUser != null && appSession.loggedInUser.isadmin != null)
  {
    UserLogic.update(id, user).then(function (saveduser)
    {
      saveduser = Formatter.removeXSS(saveduser);
      res.send(saveduser);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
  }
  else
  {
    res.send("<b>404</b>");
  }
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;
  let appSession = req.session;
  if(appSession != null && appSession.loggedInUser != null && appSession.loggedInUser.isadmin != null)
  {
    ApplicationUserLogic.deleteByUserId(id).then(function (response){
      UserLogic.delete(id).then(function (result)
      {
        result = Formatter.removeXSS(result);
        res.send(result);
      }).catch(function (err){
        console.log("error")
        console.log(err)
        res.send(JSON.stringify(err));
      })
    }).catch(function (err){
      console.log("error")
      console.log(err)
      res.send(JSON.stringify(err));
    })
  }
  else
  {
    res.send("<b>404</b>");
  }


})


router.get('/session/:sessionid', function (req, res){
  let sessionId = req.params.sessionid;
  UserLogic.checkSession(sessionId).then(function (result){
    result = Formatter.removeXSS(result);
    res.send(result);
  }).catch(function(error)
  {
    console.log("error")
    console.log(error);
    res.send(err);
  })
})

module.exports = router;
