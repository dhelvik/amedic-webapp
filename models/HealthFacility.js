/* jshint indent: 2 */
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var HealthFacility = db.define('HealthFacility', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    village_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'Village',
        key: 'name'
      }
    }
  }, {
    tableName: 'Health_Facility',
    timestamps: false
  });
module.exports = HealthFacility;
