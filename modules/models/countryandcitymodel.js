const { Model, DataTypes } = require('sequelize');

class CountryAndCityModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            id: { type: DataTypes.INTEGER, primaryKey: true },
            countryiso2: DataTypes.STRING,
            countryiso3: DataTypes.STRING,
            country: DataTypes.STRING,
            city: DataTypes.STRING,
            lon: DataTypes.DECIMAL,
            lat: DataTypes.DECIMAL 
        }, 
        { sequelize, modelName: 'countryandcity', tableName: 'countryandcity', timestamps: false, force: force });
    }
}

module.exports = CountryAndCityModel;