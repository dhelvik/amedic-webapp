/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CareGiver', {
    ID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nationalID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      unique: true
    },
    relationToPatient: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'CareGiver'
  });
};
