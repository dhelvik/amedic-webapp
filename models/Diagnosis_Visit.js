/* jshint indent: 2 */
const DataTypes = require('sequelize/lib/data-types');
const db = require('../connect.js');

var Diagnosis_Visit = db.define('Diagnosis_Visit', {
    visit_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Visit',
            key: 'ID'
        }
    },
    diagnosis_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Diagnosis',
            key: 'ID'
        }
    }
}, {
    tableName: 'Diagnosis_Visit',
    timestamps: false
});
module.exports =  Diagnosis_Visit;
