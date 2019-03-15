const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

const db = new Sequelize('AMEDIC_DB', 'mysqldbuser@amedic-mysqldbserver', 'Grupp2122', {
    host: "amedic-mysqldbserver.mysql.database.azure.com",
    dialect: "mysql",
    operatorsAliases,
    pool:{
        min:0,
        acquire: 30000,
        idle: 100000
    },
    define: {
        freezeTableName: true
    }
});

module.exports = db;

const Visit = require('./models/Visit.js');
const AMEDUser = require('./models/AMEDUser.js');
const Diagnosis = require('./models/Diagnosis.js');
const DiagnosisVisit = require('./models/Diagnosis_Visit.js');
const Patient = require('./models/Patient.js');
const Notes = require('./models/Notes.js');
const SymptomsSheet = require('./models/SymptomsSheet.js');
const Treatment = require('./models/Treatment.js');
const TreatmentDiagnosis = require('./models/Treatment_Diagnosis.js');
const Caregiver = require('./models/CareGiver');
const Caregiver_Patient = require('./models/CareGiver_Patient');
AMEDUser.hasMany(Visit, {foreignKey:'user_id', sourceKey:'ID'});
Visit.belongsTo(AMEDUser, {foreignKey: 'user_id', targetKey:'ID'});
Patient.hasMany(Visit, {foreignKey:'patient_id', sourceKey:'ID'});
Visit.belongsTo(Patient, {foreignKey: 'patient_id', targetKey:'ID'});
Visit.belongsToMany(Diagnosis, {through: { model: DiagnosisVisit}, foreignKey: 'visit_id' });
Diagnosis.belongsToMany(Visit, {through: { model: DiagnosisVisit}, foreignKey: 'diagnosis_id' });
Visit.hasMany(Notes, {foreignKey:'visit_id', sourceKey:'id'});
Notes.belongsTo(Visit, {foreignKey:'visit_id', targetKey:'id'});
Notes.belongsTo(AMEDUser, {foreignKey:'health_expert_id', targetKey:'ID'});
Visit.belongsTo(SymptomsSheet, {foreignKey:'symptoms_sheet_id', targetKey:'ID'});
Treatment.belongsToMany(Diagnosis, {through: { model: TreatmentDiagnosis}, foreignKey: 'treatment_id' });
Diagnosis.belongsToMany(Treatment, {through: { model: TreatmentDiagnosis}, foreignKey: 'diagnosis_id' });
Caregiver.belongsToMany(Patient, {through: {model: Caregiver_Patient}, foreignKey: 'caregiver_id'});
Patient.belongsToMany(Caregiver, {through: {model: Caregiver_Patient}, foreignKey: 'patient_id'});


