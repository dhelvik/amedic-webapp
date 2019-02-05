/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HealthFacility', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    villageName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'Village',
        key: 'name'
      }
    }
  }, {
    tableName: 'HealthFacility'
  });
};
