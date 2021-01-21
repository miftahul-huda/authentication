const CountryAndCityModel  = require( '../models/countryandcitymodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/authentication.sqlite'
});

class CityLogic {

    static async findAll(citycode)
    {
        console.log(citycode)
        try{
            let cities  = await CountryAndCityModel.findAll({
                attributes: ['id', 'city', 'lon', 'lat'],
                where: {
                    countryiso3 : citycode
                }
            })
            return { success: true, payload: cities }
        }
        catch (error)
        {
            console.log(error);
            throw { success: false, message: '', error: error };
        }
    }

    static async findByKeyword(search)
    {
        try{
            let countries  = await CountryAndCityModel.findAll({
                attributes: ['id', 'city', 'lon', 'lat', 'country', 'countryiso3'],
                where: {
                    [Op.or] : [
                        {city: { [Op.like] : search.keyword }},
                        {country: { [Op.like] : search.keyword }},
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

    static async get(id)
    {
        try{
            let city    = await CountryAndCityModel.findByPk(id, {
                attributes:[ 'id', 'city', 'lon', 'lat', 'country', 'countryiso3' ]
            })
            return { success: true, payload: city }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

}

module.exports = CityLogic;