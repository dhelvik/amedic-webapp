/* jshint indent: 2 */

const bcrypt = require('bcryptjs');
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');


var AMEDUser = db.define('AMEDUser', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    loginID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    }
}, {
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    },
    tableName: 'AMEDUser',
    timestamps: false
});

module.exports = AMEDUser;

