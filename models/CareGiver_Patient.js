/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CareGiver_Patient', {
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
    tableName: 'CareGiver_Patient'
  });
};
