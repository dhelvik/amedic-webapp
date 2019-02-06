/* jshint indent: 2 */
const Sequelize  = require('sequelize');
const db = require('../connect.js');

const Patient = db.define('Patient', {
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nationalID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true
    },
    mobileNo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true
    },
    villageName: {
      type: DataTypes.STRING,
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
    tableName: 'Patient'
  });

module.exports = Patient;