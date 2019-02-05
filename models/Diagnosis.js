/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Diagnosis', {
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
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    class: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'Diagnosis'
  });
};
