/* jshint indent: 2 */
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var HealthExpert = db.define('HealthExpert', {
    ID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    loginID: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    facility: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'HealthFacility',
        key: 'name'
      }
    }
  }, {
    tableName: 'HealthExpert',
    timestamps: false
  });
module.exports = HealthExpert;
