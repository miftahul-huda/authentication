var express = require('express');
var router = express.Router();

const UserLogic = require('../modules/logic/userlogic')
const ApplicationUserLogic = require('../modules/logic/applicationuserlogic')


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
        res.send(saveduser);
    }).catch(function (err){
        console.log("error")
        res.send(err);
    })
})

router.get('/', function (req, res){

    UserLogic.findAll().then(function (users)
    {
        res.send(users);
    }).catch(function (err){
        console.log("error")
        console.log(err);
        res.send(err);
    })
})


router.get('/get/:id', function (req, res){
    let id = req.params.id;
  
    UserLogic.get(id).then(function (user)
    {
      res.send(user);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.get('/search/:keyword', function (req, res){
    let keyword = req.params.keyword;
  
    UserLogic.findByKeyword(keyword).then(function (users)
    {
      res.send(users);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.post('/login', function (req, res){
    let user = req.body;
  
    UserLogic.login(user.email, user.password).then(function (saveduser)
    {
      res.send(saveduser);
    }).catch(function (err){
      console.log("error")
      res.send(err);
    })
})

router.post('/loginbyapp', function (req, res){
  let user = req.body;
  let appSession = req.session;

  UserLogic.loginByApp(user.email, user.password, user.appId).then(function (saveduser)
  {
    appSession.loggedInUser = saveduser.payload;
    res.send(saveduser);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})



router.post('/loginbyemail', function (req, res){
  let user = req.body;
  let appSession = req.session;

  UserLogic.loginByEmail(user.email).then(function (saveduser)
  {
    appSession.loggedInUser = saveduser.payload;
    res.send(saveduser);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.post('/update/:id', function (req, res){
  let user = req.body;
  let id = req.params.id;

  UserLogic.update(id, user).then(function (saveduser)
  {
    res.send(saveduser);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  ApplicationUserLogic.deleteByUserId(id).then(function (response){
    UserLogic.delete(id).then(function (result)
    {
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


})


router.get('/session/:sessionid', function (req, res){
  let sessionId = req.params.sessionid;
  UserLogic.checkSession(sessionId).then(function (result){
    res.send(result);
  }).catch(function(error)
  {
    console.log("error")
    console.log(error);
    res.send(err);
  })
})

module.exports = router;
