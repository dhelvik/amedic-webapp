/* jshint indent: 2 */
/* jshint indent: 2 */
//const bcrypt = require('bcrypt');
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var CareGiver = db.define('CareGiver', {
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
    nationalID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      unique: true
    },
    relationToPatient: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'CareGiver',
    timestamps: false
  })
};
module.exports = CareGiver;
