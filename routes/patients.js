const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const AMEDUser = require('../models/AMEDUser');
const Visit = require('../models/Visit');
const Diagnosis = require('../models/Diagnosis');
const Caregiver = require('../models/CareGiver');

const Caregiver_Patient = require('../models/CareGiver_Patient');
const sessionChecker = require('../scripts/sessionChecker.js');
const Sequelize = require('sequelize');

router.get('/', sessionChecker, (req, res) =>
    res.render('showPatient')
);

router.get('/register', sessionChecker, (req, res) =>
    res.render('registerPatient')
);

//register patient
router.post('/register', sessionChecker, function (req, res) {
    Patient.create({
        name: req.body.name + " " + req.body.lastName,
        national_id: req.body.nationalID,
        mobile_no: req.body.mobileNo,
        sex: req.body.sex,
        date_of_birth: req.body.dateOfBirth,
        village_name: req.body.villageName
    }).then(patient => {
        if (req.body.caregiverName) {
            Caregiver.create({
                name: req.body.caregiverName,
                national_id: req.body.caregiverNationalId,
                relation_to_patient: req.body.relation,
                date_of_birth: req.body.caregiverDateOfBirth,
                mobile_no: req.body.caregiverMobileNo
            }).then(caregiver => {
                console.log(patient);
                console.log(caregiver);
                Caregiver_Patient.create({
                    patient_id: patient.ID,
                    caregiver_id: caregiver.ID
                });
                res.json({
                    message: "Patient & Cargiver added.",
                    status: 200,
                });
            });
        } else {
            res.json({
                message: "Patient added.",
                status: 200,
            });
        }
    }).catch(Sequelize.UniqueConstraintError, function(err){
        res.json({
            message : "A patient with the same national ID already exists",
            status : 400
        });
    }).catch((err) => {
        console.log(err)
        res.json({
            error: err,
            status: 500,
            message: "Database error"
        });

    });
});

//Find specific patient
router.post('/', sessionChecker, function (req, res) {
    var result = [];
    Patient.findOne({where: {national_id: req.body.id}}).then(Patient => {
        if (Patient != null) {
            result.push(Patient);
            res.send(result);
            res.end();
        } else {
            res.end();
        }
    }).catch((err) => {
        console.log(err);
        res.json({
            message: "Database error",
            error: err,
            status: 500
        });
    });
});
//Delete Patient
router.post('/deletePatient', sessionChecker, function (req, res) {
    Patient.destroy({
        where: {id: req.body.id}
    })

})
//Update Patient
router.post('/updatePatient', sessionChecker, function (req, res) {
    Patient.update({
            name: req.body.name,
            //national_id: req.body.nationalID,
            mobile_no: req.body.mobileNo,
            //sex: req.body.sex,
            village_name: req.body.villageName,
            //date_of_birth: req.body.dateOfBirth
        },
        {
            where: {
                id: req.body.id
            }
        })
        .then(result => {
            res.json({
                status: 200,
                message: "Patient updated"
            });
        }).catch((err) => {
        console.log(err);
        res.json({
            error: err,
            message: "Database error",
            status: 500

        });
    });
});

//get records
router.get('/:id', sessionChecker, function (req, res) {
    Patient.findOne(
        {where: {national_id: req.params.id}, include: {model: Caregiver}}).then(patient => {
        if (!patient) {
            res.render('pageNotFound');
            return;
        }
        Visit.findAll(
            {
                where: {patient_id: patient.ID}, include: [{model: AMEDUser}, {model: Diagnosis}]
            }).then(visits => {
            res.render('records', {
                patient: patient,
                visits: visits
            });
            res.end();
        }).catch(function (err) {
            console.log(err)
            res.json({
                Error: err,
                Status: 500
            });
        });
    });
});


//Register caregiver

router.post("/registerCaregiver", sessionChecker, function (req, res) {
    Caregiver.create({
        name: req.body.caregiverName,
        national_id: req.body.caregiverNationalId,
        relation_to_patient: req.body.relation,
        date_of_birth: req.body.caregiverDateOfBirth,
        mobile_no: req.body.caregiverMobileNo
    }).then(function (caregiver) {
        Caregiver_Patient.create({
            caregiver_id: caregiver.ID,
            patient_id: req.body.patient_id
        });
        res.json({
            message: "Caregiver added",
            status: 200,
        })
    }).catch(function (err) {
        console.log(err)
        res.json({
            error: err,
            message: "Database error",
            status: 500
        });
    });

});

module.exports = router;