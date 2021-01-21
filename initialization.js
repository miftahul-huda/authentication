const UserModel  = require( './modules/models/usermodel')
const OrganizationModel  = require( './modules/models/organizationmodel')
const ApplicationModel  = require( './modules/models/applicationmodel')
const UserApplicationModel  = require( './modules/models/userapplicationmodel')
const CountryAndCityModel  = require( './modules/models/countryandcitymodel')
const LogModel  = require( './modules/models/logmodel')

const { Sequelize, Model, DataTypes } = require('sequelize');

import Config from './config.json';

/*const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/authentication.sqlite'
});*/

/*const sequelize = new Sequelize('authentication', 'nodeuser', 'rotikeju98', {
    host: '/cloudsql/mind-id-mct-dev:asia-southeast2:authentication-uploader',
    dialect: 'postgres',
    dialectOptions: {
        socketPath: '/cloudsql/mind-id-mct-dev:asia-southeast2:authentication-uploader'
    }
  });*/

const sequelize = new Sequelize(Config.database.name, Config.database.user, Config.database.password, {
    host: Config.database.host,
    dialect: Config.database.type  
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



