const LogModel  = require( '../models/logmodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/authentication.sqlite'
});

class LogLogic {

    static async create(log)
    {
        let result = this.validateCreate(log);
        if(result.success){
            try {
                let newlog = await LogModel.create(log);
                result.payload = newlog;
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

    static async findAll()
    {
        try{
            let logs  = await LogModel.findAll({
                order:[
                    ['logDate', 'DESC']
                ]
            })
            return { success: true, payload: logs }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(search)
    {
        try{
            let logs  = await LogModel.findAll({
                where: {
                    [Op.or] : [
                        {logname: { [Op.like] : '%' + search.logname + '%' }},
                        {logdescription: { [Op.like] : '%' + search.firstname + '%' }}
                    ]

                }
            })
            return { success: true, payload: logs }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let log  = await LogModel.findByPk(id);

            return { success: true, payload: clone }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  log)
    {
        let result = this.successate(log);
        console.log(id)
        if(result.success){
            try {
                let newlog = await LogModel.update(log, { where:  { id: id }  });
                result.payload = newlog;
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
            let log  = await LogModel.findByPk(id);
            let result = await LogModel.destroy(log);
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static validateCreate(log){
        
        return this.validate(log);
    }

    static validate(log)
    {   
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = LogLogic;