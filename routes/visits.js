const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');
const Notes = require('../models/Notes');
const Symptoms = require('../models/SymptomsSheet');
const Diagnosis = require('../models/Diagnosis');
const Treatment = require('../models/Treatment');
const Patient = require('../models/Patient');
//TEST AV NY SIDA
router.get('/:id', function (req, res) {
    Visit.findOne(
        {where: {ID: req.params.id}}).then(visit => {
        var result = [];
        var moreResult=[];
        result.push(visit);
        Notes.findAll({where: {visit_id: req.params.id}}).then(notes => {
            result.push(notes);
            Symptoms.findOne({where: {ID: visit.symptoms_sheet_id}, raw: true}).then(symptoms => {
                result.push(symptoms);
                Diagnosis.findOne({where: {ID: visit.diagnosis_id}, raw: true}).then(diagnosis => {
                    result.push(diagnosis);
                    Patient.findOne({where: {ID: visit.patient_id}, raw: true}).then(patientInfo => {

                        result.push(patientInfo);

                    res.render('visit', {
                        result: result,
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
router.post("/addVisit", function(req, res) {
    console.log("Inside add visit");
    const visit = Visit.create({
        patient_id: req.body.patientID,
        diagnosis_id: req.body.diagnosisID,
        user_id: req.body.userID,
        timestamp: Date.now()
    }).then(function (visit) {
        console.log(req.body);
        console.log(visit);
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
});

module.exports = router;