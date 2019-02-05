/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HSA_visit', {
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
    tableName: 'HSA_visit'
  });
};
