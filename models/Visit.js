/* jshint indent: 2 */
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var Visit = db.define('Visit', {
    id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: 'Patient',
            key: 'ID'
        }
    },
    patient_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
        unique: true,
      references: {
        model: 'Patient',
        key: 'ID'
      }
    },
    diagnosis_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
        unique: true,
        references: {
        model: 'Diagnosis',
        key: 'ID'
      }
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
        unique: true,
        references: {
        model: 'AMED_User',
        key: 'ID'
      }
    },
    symptoms_sheet_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
        unique: true,
        references: {
        model: 'Symptoms_Sheet',
        key: 'ID'
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Visit',
    timestamps : false
  });
module.exports = Visit;
