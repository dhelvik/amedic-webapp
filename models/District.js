/* jshint indent: 2 */
//const bcrypt = require('bcrypt');
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var District = db.define('District', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'District',
    timestamps: false
  });
module.exports = District;
