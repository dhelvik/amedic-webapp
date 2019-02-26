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
    national_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      unique: true
    },
    mobile_no: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    village_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'Village',
        key: 'name'
      }
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    caregiver_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        unique:true,
        references: {
            model: 'Caregiver',
            key: 'ID'
        }
    },
  }, {
    tableName: 'Patient',
    timestamps: false
  });
module.exports = Patient;

