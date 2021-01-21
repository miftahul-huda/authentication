const { Model, DataTypes } = require('sequelize');
const UserModel = require('./usermodel');
const ApplicationModel = require('./applicationmodel');

class UserApplicationModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            appid: {
                type: DataTypes.INTEGER,
                references:{
                    model: ApplicationModel,
                    key: 'id'
                }
            },
            userid: {
                type: DataTypes.INTEGER,
                references:{
                    model: UserModel,
                    key: 'id'
                }
            },
            createdAt: DataTypes.DATE
        }, 
        { sequelize, modelName: 'userapplication', tableName: 'userapplication', force: force });
    }
}

module.exports = UserApplicationModel;