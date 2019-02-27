/* jshint indent: 2 */
/* jshint indent: 2 */
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
    national_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      unique: true
    },
    relation_to_patient: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: true
    },
    mobile_no: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true
    },
  }, {
    tableName: 'CareGiver',
    timestamps: false
  });
module.exports = CareGiver;
