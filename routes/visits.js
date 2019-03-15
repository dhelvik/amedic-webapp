const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');
const Notes = require('../models/Notes');
const Symptoms = require('../models/SymptomsSheet');
const Diagnosis = require('../models/Diagnosis');
const Treatment = require('../models/Treatment');
const Patient = require('../models/Patient');
const AMEDUser = require('../models/AMEDUser.js');
const sessionChecker = require('../scripts/sessionChecker.js');
//TEST AV NY SIDA
router.get('/:id', sessionChecker, function (req, res) {
    Visit.findOne(
        {
            where: {ID: req.params.id},
            include: [
                {model: AMEDUser},
                {model: Diagnosis, include: {model: Treatment}},
                {model: Notes, include: {model: AMEDUser}},
                {model: Symptoms},
                {model: Patient}
            ], order: [[{model: Notes}, 'timestamp', 'DESC']]
        }).then(visit => {
        res.render('visit', {
            visit: visit,
        });
    });


});

router.post('/addNote', sessionChecker, function (req, res) {
    if (req.session.user) {
        console.log(req.body);
        const newNote = Notes.create({
            description: req.body.description,
            timestamp: Date.now(),
            visit_id: req.body.visit_id,
            health_expert_id: req.session.user.ID,
        }).then(function (item) {
            console.log(item);
            res.json({
                Message: "Note added.",
                Status: 200,
                Item: newNote
            });
        }).catch(function (err) {
            res.json({
                Error: err,
                Status: 500

            });
        });
    } else {
        console.log("No logged in user");
        res.json({
            Error: "User missing",
            Status: 500

        });
    }
});
//addVisit
router.post("/addVisit", sessionChecker, function (req, res) {
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
        console.log("No logged in user");
        res.json({
            Error: "User missing",
            Status: 500

        });
    }
});

module.exports = router;