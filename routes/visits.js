const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');
const Notes = require('../models/Notes');
const Symptoms = require('../models/SymptomsSheet');
const Diagnosis = require('../models/Diagnosis');
const Treatment = require('../models/Treatment');
//TEST AV NY SIDA
router.get('/:id', function (req, res) {
    Visit.findOne(
        {where: {ID: req.params.id}}).then(visit => {
        var result = [];
        result.push(visit);
        Notes.findAll({where: {visit_id: req.params.id}}).then(notes => {
            result.push(notes);
            Symptoms.findOne({where: {ID: visit.symptoms_sheet_id}, raw: true}).then(symptoms => {
                result.push(symptoms);
                Diagnosis.findOne({where: {ID: visit.diagnosis_id}, raw: true}).then(diagnosis => {
                    result.push(diagnosis);


                    res.render('visit', {
                        result: result
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

module.exports = router;