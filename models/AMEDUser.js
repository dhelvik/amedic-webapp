/* jshint indent: 2 */

const bcrypt = require('bcryptjs');
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');


var AMEDUser = db.define('AMEDUser', {
    ID: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    national_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true
    },
    mobile_no: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    login_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hsa_flag: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    },
    admin_flag: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    },
    health_expert_flag: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    },
    health_facility_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    },
    tableName: 'AMED_User',
    timestamps: false
});

module.exports = AMEDUser;

