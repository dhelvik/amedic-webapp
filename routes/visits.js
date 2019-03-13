const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');
const Notes = require('../models/Notes');
const Symptoms = require('../models/SymptomsSheet');
const Diagnosis = require('../models/Diagnosis');
const Treatment = require('../models/Treatment');
const Patient = require('../models/Patient');
const AMEDUser = require('../models/AMEDUser.js')
//TEST AV NY SIDA
router.get('/:id', function (req, res) {
    Visit.findOne(
        {where: {ID: req.params.id},
            include:[
                {model: AMEDUser},
                {model: Diagnosis},
                {model: Notes},
                {model: Symptoms},
                {model: Patient}
                ]
        }).then(visit => {
            console.log(visit)
        var result = [];
        var moreResult = [];
        result.push(visit);
        Notes.findAll({where: {visit_id: req.params.id}}).then(notes => {
            result.push(notes);
            Symptoms.findOne({where: {ID: visit.symptoms_sheet_id}, raw: true}).then(symptoms => {
                result.push(symptoms);
                Diagnosis.findOne({where: {ID: 1}, raw: true}).then(diagnosis => {
                    result.push(diagnosis);
                    Patient.findOne({where: {ID: visit.patient_id}, raw: true}).then(patientInfo => {

                        result.push(patientInfo);

                        res.render('visit', {
                            visit: visit,
                            result: result
                        });
                    });
                });
            });
        });

    });
});

router.post('/addNote', function (req, res) {
    const newNote = Notes.create({
        description: req.body.description,
        timestamp: req.body.timestamp,
        visit_id: req.body.visit_id,
        health_expert_id: req.body.health_expert_id,


    }).then(function (item) {
        console.log(newNote);
        res.json({
            Message: "Created item.",
            Status: 200,
            Item: newNote
        });
    }).catch(function (err) {
        res.json({
            Error: err,
            Status: 500

        });
    });
});
//addVisit
router.post("/addVisit", function (req, res) {
    if (req.session.user) {
        const visit = Visit.create({
            patient_id: req.body.patient_id,
            user_id: req.session.user.ID,
            timestamp: Date.now()
        }).then(function (visit) {
            visit.addDiagnosis(req.body.diagnosisID);
            const notes = Notes.create({
                description: req.body.note,
                visit_id: visit.id,
                timestamp: Date.now()
            }).then(function (item) {
                res.json({
                    Message: "Created item.",
                    Status: 200,
                });
            }).catch(function (err) {
                console.log(err)
                res.json({
                    Error: err,
                    Status: 500
                });
            });
        });
    } else {
        Console.log("No logged in user");
        res.json({
            Error: "User missing",
            Status: 500

        });
    }
});

module.exports = router;