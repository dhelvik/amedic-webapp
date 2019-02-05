/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Treatment_Diagnosis', {
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
    tableName: 'Treatment_Diagnosis'
  });
};
