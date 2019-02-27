/* jshint indent: 2 */
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

  var Treatment = db.define('Treatment', {
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
    treatment_Scheme: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    drug: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    drug_administration: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'Treatment',
    timestamps: false
  });
module.exports = Treatment;
