/* jshint indent: 2 */
//const bcrypt = require('bcrypt');
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var Patient = db.define('Patient', {
    ID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nationalID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      unique: true
    },
    mobileNo: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    villageName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'Village',
        key: 'name'
      }
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'Patient',
    timestamps: false
  });
module.exports = Patient;

