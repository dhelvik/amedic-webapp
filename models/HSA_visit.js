/* jshint indent: 2 */
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var HSA_visit = db.define('HSA_visit', {
    patientID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Patient',
        key: 'ID'
      }
    },
    diagnosisID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Diagnosis',
        key: 'ID'
      }
    },
    HSAID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'HSA',
        key: 'ID'
      }
    },
    symptomID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'SymptomsSheet',
        key: 'ID'
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'HSA_visit',
    timestamps : false
  });
module.exports = HSA_visit;
