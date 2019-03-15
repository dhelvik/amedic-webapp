const express = require('express');
const router = express.Router();
const db = require('../connect');
const Patient = require('../models/Patient');
const AMEDUser = require('../models/AMEDUser');
const Village = require('../models/Village');
const Visit = require('../models/Visit');
const Diagnosis = require('../models/Diagnosis');
const Caregiver = require('../models/CareGiver');
const Note = require('../models/Notes');

const Caregiver_Patient = require('../models/CareGiver_Patient');
const sessionChecker = require('../scripts/sessionChecker.js');

router.get('/', sessionChecker, (req, res) =>
// Gets all patients
        Patient.findAll().then(result => {
            res.render('showPatient', {
                result
            })
        })
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


    }).catch((err) => {
        console.log(err)
        res.json({
            error: err,
            status: 500

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
    })

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
                status: 200
            });
        }).catch((err) => {
        console.log(err)
        res.json({
            error: err,
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


//Caregiver
router.post("/createCaregiver", function (req, res) {
    Caregiver.create({
        name: req.body.name + " " + req.body.caregiverName,
        national_id: req.body.caregiverNationalID,
        mobile_no: req.body.caregiverMobileNo,
        relation_to_patientt: req.body.relationToPatient,
        date_of_birth: req.body.caregiverDateOfBirth,
    });
});

router.post("", sessionChecker, function (req, res) {
    const caregiver = Caregiver.create({
        name: req.body.name + " " + req.body.caregiverName,
        national_id: req.body.caregiverNationalID,
        mobile_no: req.body.caregiverMobileNo,
        relation_to_patientt: req.body.relationToPatient,
        date_of_birth: req.body.caregiverDateOfBirth,
    }).then(function (item) {

    }).catch(function (err) {
        console.log(err)
        res.json({
            error: err,
            status: 500

        });
    });

});

module.exports = router;