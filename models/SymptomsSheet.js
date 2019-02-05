/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SymptomsSheet', {
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
    coughDays: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    diarrhoea: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    diarrhoeaDays: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    bloodInStool: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fever: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    feverDays: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    convulsions: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    difficultToEatDrink: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    cannotEatDrink: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    vomiting: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    vomitsEverything: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    redEyes: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    redEyesDays: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    difficultiesToSee: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    difficultiesToSeeDays: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    chestIndraw: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    breathingFreq: {
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
    palmarPalor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    muac: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    swollenFeet: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'SymptomsSheet'
  });
};
