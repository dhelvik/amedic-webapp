/* jshint indent: 2 */
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var Treatment_Diagnosis = db.define('Treatment_Diagnosis', {
treatment_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Treatment',
        key: 'ID'
      }
    },
    diagnosis_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Diagnosis',
        key: 'ID'
      }
    }
  }, {
    tableName: 'Treatment_Diagnosis',
    timestamps: false
  });
module.exports =  Treatment_Diagnosis;
