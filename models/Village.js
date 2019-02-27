/* jshint indent: 2 */
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var Village = db.define('Village', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    district_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'District',
        key: 'name'
      }
    }
  }, {
    tableName: 'Village',
    timestamps: false
  });
module.exports = Village;
