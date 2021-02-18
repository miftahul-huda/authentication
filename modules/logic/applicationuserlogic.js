const UserApplicationModel  = require( '../models/userapplicationmodel')
const ApplicationModel  = require( '../models/applicationmodel')
const UserModel  = require( '../models/usermodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/authentication.sqlite'
});

class ApplicationUserLogic {

    static async register(appUser)
    {
        let result = { success: true }
        if(result.success){
            try {
                appUser.createdAt = new Date();
                let newappUser = await UserApplicationModel.create(appUser);
                //newapp = this.clear(app)
                result.payload = newappUser;
                return  result;
            }
            catch(error)
            {
                console.log(error)
                throw { success: false, message: '', error: error };
            }
            
        }
        else
        {
            throw result
        }

    }

    static async findAll()
    {
        try{
            let apps  = await UserApplicationModel.findAll()
            return { success: true, payload: apps }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }


    static async get(appId, userId)
    {
        try{
            let apps  = await UserApplicationModel.findAll({
                where: {
                    [Op.and] : {
                        userid : userId,
                        appid : appId
                    }
                }
            });

            return { success: true, payload: apps }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async delete(appId, userId)
    {
        try{
            let apps  = await UserApplicationModel.destroy({
                where: {
                    [Op.and] : {
                        userid : userId,
                        appid : appId
                    }
                }
            });

            return { success: true, payload: apps }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async deleteByUserId( userId)
    {
        try{
            let apps  = await UserApplicationModel.destroy({
                where: {

                        userid : userId
                        
                }
            });

            return { success: true, payload: apps }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async deleteByAppId( appId)
    {
        try{
            let apps  = await UserApplicationModel.destroy({
                where: {

                        appId : appId
                        
                }
            });

            return { success: true, payload: apps }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async deleteAll()
    {
        try{
            await UserApplicationModel.destroy({
                where: {},
                truncate: true
            });

            await ApplicationModel.destroy({
                where: {},
                truncate: true
            });

            await UserModel.destroy({
                where: {},
                truncate: true
            });

            return { success: true, payload: null }
        }
        catch (error)
        {
            console.log(error);
            throw { success: false, message: '', error: error };
        }
    }
}

module.exports = ApplicationUserLogic;