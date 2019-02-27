/* jshint indent: 2 */
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var CareGiver_Patient = db.define('CareGiver_Patient', {
    patient_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Patient',
        key: 'ID'
      }
    },
    caregiver_id: {
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
  });
module.exports = CareGiver_Patient;
