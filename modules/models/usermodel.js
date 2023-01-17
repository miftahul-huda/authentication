const { Model, DataTypes } = require('sequelize');
const CountryAndCityModel = require('./countryandcitymodel');
const OrganizationModel = require('./organizationmodel');

class UserModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            password: DataTypes.STRING,
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            gender: DataTypes.STRING,
            photourl: DataTypes.STRING,
            cityId:  DataTypes.INTEGER,
            email: DataTypes.STRING,
            lastLogin: DataTypes.STRING,
            currentSessionID: DataTypes.STRING,
            sessionExpiredDate: DataTypes.STRING,
            orgId: DataTypes.INTEGER,
            isadmin: DataTypes.INTEGER,
            isActive: DataTypes.INTEGER

        }, 
        { sequelize, modelName: 'user', tableName: 'user', force: force });
    }
}

module.exports = UserModel;