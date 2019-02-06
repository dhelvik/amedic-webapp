/* jshint indent: 2 */
//const bcrypt = require('bcrypt');
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var CareGiver_Patient = db.define('CareGiver_Patient', {
    patientID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Patient',
        key: 'ID'
      }
    },
    careGiverID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'CareGiver',
        key: 'ID'
      }
    }
  }, {
    tableName: 'CareGiver_Patient',
    timestamps: false
  })
};
module.exports = CareGiver_Patient;
