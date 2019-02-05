/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HealthExpert', {
    ID: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    loginID: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    facility: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'HealthFacility',
        key: 'name'
      }
    }
  }, {
    tableName: 'HealthExpert'
  });
};
