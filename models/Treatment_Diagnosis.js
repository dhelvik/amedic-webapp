/* jshint indent: 2 */

//const bcrypt = require('bcrypt');
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var Treatment_Diagnosis = db.define('Treatment_Diagnosis', {
treatmentID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Treatment',
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
    }
  }, {
    tableName: 'Treatment_Diagnosis',
    timestamps: false
  })
};
module.exports =  Treatment_Diagnosis;
