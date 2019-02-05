/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Village', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    districtName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'District',
        key: 'name'
      }
    }
  }, {
    tableName: 'Village'
  });
};
