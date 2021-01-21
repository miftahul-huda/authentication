const { Model, DataTypes } = require('sequelize');

class OrganizationModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            orgname: DataTypes.STRING,
            orginfo: DataTypes.STRING
        }, 
        { sequelize, modelName: 'organization', tableName: 'organization',  force: force });
    }
}

module.exports = OrganizationModel;