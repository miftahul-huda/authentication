const ApplicationModel  = require( '../models/applicationmodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/authentication.sqlite'
});

const Formatter = require("../util/formatter");

class ApplicationLogic {

    static async register(app)
    {
        let result = this.validate(app);
        if(result.success){
            try {
                app.createdAt = new Date();
                let newapp = await ApplicationModel.create(app);
                //newapp = this.clear(app)
                result.payload = newapp;
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
            let apps  = await ApplicationModel.findAll();
            console.log(apps);
            return { success: true, payload: apps }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(search)
    {
        try{
            let apps  = await ApplicationModel.findAll({
                where: {
                    [Op.or] : [
                        {appname: { [Op.like] : search.appname }},
                        {appdescription: { [Op.like] : search.firstname }}
                    ]

                }
            })
            return { success: true, payload: apps }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let app  = await ApplicationModel.findByPk(id);

            return { success: true, payload: clone }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  app)
    {
        let result = this.validate(app);
        console.log(id)
        if(result.success){
            try {
                let newapp = await ApplicationModel.update(app, { where:  { id: id }  });
                result.payload = newapp;
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
            let result = await ApplicationModel.destroy({
                where: {
                    id: id
                }
            });
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static successateCreate(app){
        if(app.appname == null || app.appname.length ==  0)
            return {success :  false, message: "Name cannot be empty"}
        
        return this.successate(app);
    }

    static validate(app)
    {   
        let res = Formatter.checkXSS(app);
        if(res == true)
            return { success: false, message: "No script is allowed"}
        
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = ApplicationLogic;