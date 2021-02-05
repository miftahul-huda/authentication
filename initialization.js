const UserModel  = require( './modules/models/usermodel')
const OrganizationModel  = require( './modules/models/organizationmodel')
const ApplicationModel  = require( './modules/models/applicationmodel')
const UserApplicationModel  = require( './modules/models/userapplicationmodel')
const CountryAndCityModel  = require( './modules/models/countryandcitymodel')
const LogModel  = require( './modules/models/logmodel')

const { Sequelize, Model, DataTypes } = require('sequelize');
const process = require('process');




const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: "postgresql"  
});

class Initialization {
    static async initializeDatabase(){

        let force = false;

        CountryAndCityModel.initialize(sequelize);

        UserModel.initialize(sequelize, force);

        LogModel.initialize(sequelize, force);

        ApplicationModel.initialize(sequelize, force);

        UserApplicationModel.initialize(sequelize, force);

        OrganizationModel.initialize(sequelize, force);
 
        UserModel.belongsTo(CountryAndCityModel, { foreignKey: 'cityId' })

        UserModel.belongsTo(OrganizationModel, { foreignKey: 'orgId' })

        await sequelize.sync();


        //ApplicationModel.belongsToMany(UserModel, { through: UserApplicationModel } )
    }
}

module.exports = Initialization



