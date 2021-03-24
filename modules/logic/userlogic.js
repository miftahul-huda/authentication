const UserModel  = require( '../models/usermodel')
const CountryAndCityModel  = require( '../models/countryandcitymodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const UserApplicationModel = require('../models/userapplicationmodel');
const ApplicationModel = require('../models/applicationmodel');
const OrganizationModel = require('../models/organizationmodel');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/authentication.sqlite'
});

const Formatter = require("../util/formatter");

class UserLogic {

    static clear(user){
        var sjson = JSON.stringify(user);
        var clone = JSON.parse(sjson);
        console.log(clone);
        delete clone["password"]
        return clone;
    }

    static async login(email, password){
        try{
            let users = await UserModel.findAll({
                where:
                {
                    [Op.and] : [
                        { email: { [Op.like] : email  }},
                        { password: { [Op.like] : password  }}
                    ]
                }
                ,
                include: [ CountryAndCityModel, OrganizationModel]
            });
            let user = (users.length  > 0) ?  users[0] : null;
            if(user != null)
            {
                user = JSON.parse(JSON.stringify(user));
                delete user.password;
                return { success: true, payload: user }
            }
            else {
                return { success: false, payload: user, message: "Username tidak terdaftar, atau password salah" }
            }
        }
        catch (e){
            throw { success: false, message: e.message, error: e };
        }
    }

    static async loginByApp(email, password, appId){
        try{
            let users = await UserModel.findAll({
                where:
                {
                    [Op.and] : [
                        { email: { [Op.like] : email  }},
                        { password: { [Op.like] : password  }},
                    ]
                }
                ,
                raw: true
                ,
                include: CountryAndCityModel
            });
            let user = (users.length  > 0) ?  users[0] : {};
            user = JSON.parse(JSON.stringify(user));
            delete user.password;
            console.log(user);
            
            if(users.length > 0)
            {
                let appUsers = await UserApplicationModel.findAll({
                    where:{
                        [Op.and] : {
                            appid : appId,
                            userid : user.id
                        }
                    }    
                })

                if(appUsers.length  >  0)
                {
                    let app = await ApplicationModel.findByPk(appId);
                    user.app = app;
                    let org = await OrganizationModel.findByPk(user.orgId);
                    user.org = org;
              
                    console.log("loginByApp");
                    console.log(user);
                    var currentSessionID = this.createSessionId(10);
                    var expiredDate = this.getSessionExpiredDate();
                    var lastLogin = this.getTodayDate();
                    
                    
                    await UserModel.update({
                        currentSessionID: currentSessionID,
                        sessionExpiredDate: expiredDate,
                        lastLogin: lastLogin 
                    }, {
                        where: {
                            id: user.id
                        }
                    })
                    

                    user.currentSessionID = currentSessionID;
                    user.sessionExpiredDate = expiredDate;

                    return { success: true, payload: user }
                }
                else 
                    return { success: false, payload: null,  message: 'No user for the app' }
            }
            else
                return { success: false, payload: null, message: 'User not found' }
        }
        catch (e){
            console.log("ERROR loginByApp")
            console.log(e);
            throw { success: false, message: e.message, error: e };
        }
    }

    static async loginByEmail(email){
        try{
            let users = await UserModel.findAll({
                where:
                {
                    email: { [Op.like] : email  }
                }
                ,
                raw: true
                ,
                include: CountryAndCityModel
            });
            let user = (users.length  > 0) ?  users[0] : {};
            let json = JSON.stringify(user);
            user = JSON.parse(json);
            delete user.password;
            console.log(user);
            
            if(users.length > 0)
            {
                let organizations = await OrganizationModel.findAll({
                    where:{
                        id: user.orgId
                    }    
                })

                if(organizations.length  >  0)
                {
                    user.organization = organizations[0];
                    var currentSessionID = this.createSessionId(10);
                    var expiredDate = this.getSessionExpiredDate();
                    var lastLogin = this.getTodayDate();
                    
                    
                    await UserModel.update({
                        currentSessionID: currentSessionID,
                        sessionExpiredDate: expiredDate,
                        lastLogin: lastLogin 
                    }, {
                        where: {
                            id: user.id
                        }
                    })
                    

                    user.currentSessionID = currentSessionID;
                    user.sessionExpiredDate = expiredDate;

                    user = JSON.parse(JSON.stringify(user));
                    delete user.password;

                    return { success: true, payload: user }
                }
                else 
                    return { success: false, payload: null,  message: 'User has no organization' }
            }
            else
                return { success: false, payload: null, message: 'User not found' }
        }
        catch (e){
            throw { success: false, message: e.message, error: e };
        }
    }

    static getSessionExpiredDate()
    {

        var d = new Date();
        d.setHours(d.getHours() + 8);

        var dtformat = [(d.getFullYear()),
               d.getMonth()+1,
               d.getDate()].join('-') +' ' +
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
        
        return dtformat;
    }

    static getTodayDate()
    {

        var d = new Date();

        var dtformat = [(d.getFullYear()),
               d.getMonth()+1,
               d.getDate()].join('-') +' ' +
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
        
        return dtformat;
    }

    static createSessionId(length)
    {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static async register(user)
    {

            let result = await this.validateCreate(user);
            console.log(result)
            if(result.success){
                try {
                    delete user.retypePassword;
                    user.createdAt = new Date();
                    let newUser = await UserModel.create(user);
                    console.log(newUser);
    
                    newUser = JSON.parse(JSON.stringify(newUser));
                    delete newUser.password;
                    //newUser = this.clear(user)
                    result.payload = newUser;
                    return result;
                }
                catch(error)
                {
                    console.log(error)
                    return { success: false, message: '', error: error };
                }
                
            }
            else
            {
                return result;
            }


    }

    static async findAll()
    {
        try{
            let users  = await UserModel.findAll({ include: OrganizationModel });

            users = JSON.parse(JSON.stringify(users));
            for(var i = 0; i < users.length; i++)
            {
                delete users[i].password;
            }

            return { success: true, payload: users }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(keyword)
    {
        try{
            let users  = await UserModel.findAll({
                where: {
                    [Op.or] : [
                        {email: { [Op.like] : '%' + keyword + '%' }},
                        {firstname: { [Op.like] : '%' + keyword + '%' }},
                        {lastname: { [Op.like] :'%' + keyword + '%'}},
                    ]

                }
                ,
                include: OrganizationModel
            })

            users = JSON.parse(JSON.stringify(users));
            for(var i = 0; i < users.length; i++)
            {
                delete users[i].password;
            }
            return { success: true, payload: users }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let user  = await UserModel.findByPk(id, { include: CountryAndCityModel } );

            user = JSON.parse(JSON.stringify(user));
            delete user.password;
            return { success: true, payload: user }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async checkSession(sessionId)
    {
        var user = {};
        try{
            let users  = await UserModel.findAll({
                where: {
                    currentSessionID : sessionId
                }
            } );

            if (users.length > 0)
            {
                user = users[0];
                user = JSON.parse(JSON.stringify(user));
                delete user.password;

                let organizations = await OrganizationModel.findAll({
                    where:{
                        id: user.orgId
                    }    
                })

                if(organizations.length  >  0)
                {
                    user.organization = organizations[0];
                }

                let dt1 = new Date(user.sessionExpiredDate);
                let dtNow = new Date();
                if(dt1 >= dtNow)
                {
                    return { success: true, payload: { valid : true, user: user } }
                }
                else {
                    return { success: true, payload: { valid : false, user: user } }
                }
            }
            else
            {
                return { success: true, payload: { valid : false } }
            }
            
            
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  user)
    {
        let result = this.successate(user);
        console.log(id)
        if(result.success){
            try {
                let newUser = await UserModel.update(user, { where:  { id: id }  });
                newUser =  { username: newUser.username, firstname: newUser.firstname, lastname: newUser.lastname,  mail: newUser.mail, id: newUser.id }
                
                newUser = JSON.parse(JSON.stringify(newUser));
                delete newUser.password;
                
                result.payload = newUser;
                return  result;
            }
            catch(error)
            {
                throw { success: false, message: '', error: error };
            }
            
        }
        else
        {
            throw result
        }

    }

    static async delete(id)
    {
        try{
            let result = await UserModel.destroy({
                where:  { id: id }
            });
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async validateCreate(user){
        if(user.password == null || user.password.length ==  0)
            return {success :  false, message: "Password cannot be empty"}

        if(user.password !=  user.retypePassword)
            return {success :  false, message: "Password and retype password is different"}
        
        let result = await this.validate(user);
        return result;
    }

    static async validate(user)
    {
        let res = Formatter.checkXSS(user);
        if(res == true)
            return { success: false, message: "No script is allowed"}

        if(user.firstname == null  || user.firstname.length == 0)
            return {success :  false, message: "First name cannot be empty"}
        else if(user.email == null  || user.email.length == 0)
            return {success :  false, message: "Email cannot be empty"}
        
        let oldUser = await UserModel.findAll({
            where: {
                email : user.email
            }
        });

        if(oldUser.length > 0)
            return {success: false, message: "Username is already registered"}

        
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = UserLogic;