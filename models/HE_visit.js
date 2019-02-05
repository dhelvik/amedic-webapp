/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HE_visit', {
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
    expertID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'HealthExpert',
        key: 'ID'
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'HE_visit'
  });
};
