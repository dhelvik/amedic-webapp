/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Treatment', {
    ID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    treatmentScheme: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    drug: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    drugAdministration: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'Treatment'
  });
};
