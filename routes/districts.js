const express = require('express');
const router = express.Router();
const District = require('../models/District');
const Village = require('../models/Village');
const sessionChecker = require('../scripts/sessionChecker.js');
const sessionCheckerAdmin = require('../scripts/sessionCheckerAdmin.js');
const Sequelize = require('sequelize');

router.get('/', sessionCheckerAdmin, (req, res) =>
        res.render('districts')
    );

router.get('/getDistricts', sessionChecker, (req, res) =>
    District.findAll().then(result => {
        res.send(result);
    }).catch(function(err){
        res.json({
            error : err,
            message: "Database error",
            status : 500
        });
    })
);

router.post('/addDistrict', sessionCheckerAdmin, function(req, res) {
    const newDistrict = District.create({
        name: req.body.name
    }).then(function(item){
        console.log(newDistrict.name);
        res.json({
            message : "District added",
            status : 200,
            item : newDistrict
        });
    }).catch(Sequelize.UniqueConstraintError, function(err){
        res.json({
            message : "A district with the same name already exists",
            status : 400
        });
    }).catch(function(err){
        res.json({
            error : err,
            message: "Database error",
            status : 500
        });
    });
});

module.exports = router;