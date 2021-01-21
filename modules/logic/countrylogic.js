const CountryAndCityModel  = require( '../models/countryandcitymodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/authentication.sqlite'
});

class CountryLogic {

    static async findAll()
    {
        try{
            let countries  = await CountryAndCityModel.findAll({
                attributes: ['countryiso3', 'country'],
                group: ['countryiso3', 'country']
            })
            return { success: true, payload: countries }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(search)
    {
        try{
            let countries  = await CountryAndCityModel.findAll({
                attributes: ['countryiso3', 'country'],
                group: ['countryiso3', 'country'],
                where: {
                    [Op.or] : [
                        {countryiso3: { [Op.like] : '%' + search.keyword + '%' }},
                        {country: { [Op.like] : '%' + search.keyword + '%' }},
                    ]
                }
            })
            return { success: true, payload: countries  }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(code)
    {
        try{
            let country    = await UserModel.findAll({
                where: { countryiso3: { [Op.like] : code } }
            });
            return { success: true, payload: country }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

}

module.exports = CountryLogic;