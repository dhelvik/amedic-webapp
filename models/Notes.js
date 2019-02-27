/* jshint indent: 2 */
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var Notes = db.define('Notes', {
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
    timestamp: {
      type: DataTypes.TIME,
      allowNull: true,
      unique: true
    },
    visit_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
        unique: true,
        references: {
            model: 'Visit',
            key: 'id'
        }
    },
    health_expert_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        unique: true,
        references: {
            model: 'AMEDUser',
            key: 'ID'
        }
    },

  }, {
    tableName: 'Notes',
    timestamps: false
  });

module.exports = Notes;
