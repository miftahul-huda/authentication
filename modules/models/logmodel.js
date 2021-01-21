const { Model, DataTypes } = require('sequelize');

class LogModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            logDate: DataTypes.DATE,
            logDescription: DataTypes.STRING,
            username: DataTypes.STRING
        }, 
        { sequelize, modelName: 'log', tableName: 'log', force: force });
    }
}

module.exports = LogModel;