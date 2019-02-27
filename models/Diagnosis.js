/* jshint indent: 2 */
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var Diagnosis = db.define('Diagnosis', {
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
    tableName: 'Diagnosis',
    timestamps: false
  });
module.exports = Diagnosis;
