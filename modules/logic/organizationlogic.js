const OrganizationModel  = require( '../models/organizationmodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/authentication.sqlite'
});
const Formatter = require("../util/formatter");

class OrganizationLogic {

    static async create(org)
    {
        let result = this.validateCreate(org);
        if(result.success){
            try {
                let neworg = await OrganizationModel.create(org);
                result.payload = neworg;
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
            let orgs  = await OrganizationModel.findAll()
            return { success: true, payload: orgs }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(search)
    {
        try{
            let orgs  = await OrganizationModel.findAll({
                where: {
                    [Op.or] : [
                        {orgname: { [Op.like] : '%' + search + '%' }},
                        {orginfo: { [Op.like] : '%' + search + '%' }}
                    ]

                }
            })
            return { success: true, payload: orgs }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let org  = await OrganizationModel.findByPk(id);

            return { success: true, payload: org }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  org)
    {
        let result = this.validate(org);
        if(result.success){
            try {
                let neworg = await OrganizationModel.update(org, { where:  { id: id }  });
                result.payload = neworg;
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
            let result  = await OrganizationModel.destroy({ 
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

    static validateCreate(org){
        
        return this.validate(org);
    }

    static validate(org)
    {   
        let res = Formatter.checkXSS(org);
        if(res == true)
            return { success: false, message: "No script is allowed"}
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = OrganizationLogic;