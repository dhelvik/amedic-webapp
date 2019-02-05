/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('District', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'District'
  });
};
