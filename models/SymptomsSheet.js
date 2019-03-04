/* jshint indent: 2 */
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var SymptomsSheet = db.define('SymptomsSheet', {
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
    cough: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    cough_days: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    diarrhoea: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    diarrhoea_days: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    blood_in_stool: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fever: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    fever_days: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    convulsions: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    difficult_to_eat_drink: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    cannot_eat_drink: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    vomiting: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    vomits_everything: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    red_eyes: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    red_eyes_days: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    difficulties_to_see: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    difficulties_to_see_days: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    chest_indraw: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    breathing_freq: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sleepy: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    unconscious: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    palmar_palor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    muac: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    swollen_feet: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'Symptoms_Sheet',
    timestamps: false
  });
module.exports = SymptomsSheet;
