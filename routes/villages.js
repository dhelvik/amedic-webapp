const express = require ('express');
const router = express.Router();
const Village = require('../models/Village');
const sessionCheckerAdmin = require('../scripts/sessionCheckerAdmin.js');
const sessionChecker = require('../scripts/sessionChecker.js');
const Sequelize = require('sequelize');

/*
    Returns all villages for a specific district
*/
router.post('/findVillages',sessionChecker, function(req, res) {
    Village.findAll({
        where: {district_name: req.body.districtName},
    }).then(result => {
        res.send(result);
    }).catch(function(err){
        res.json({
            error : err,
            message: "Database error",
            status : 500
        });
    });
});
/*
    Adds a new village for a specific district, returns an error if the village already exists
*/
router.post('/addVillage',sessionCheckerAdmin, function(req, res) {
    const newVillage = Village.create({
        name: req.body.villageName,
        district_name: req.body.districtName
    }).then(function(item){
        console.log(newVillage);
        res.json({
            message : "Village added",
            status : 200,
            item : newVillage
        });
    }).catch(Sequelize.UniqueConstraintError, function(err){
        res.json({
            message : "A village with the same name already exists",
            status : 400
        });
    }).catch(function(err){
        console.log(err);
        res.json({
            error : err,
            message: "Database error",
            status : 500
        });
    });
});
/*
    Removes a village with a specific name, returns an error if there still are connections to that village
*/
router.post('/removeVillage',sessionCheckerAdmin, function(req,res){
    const name = req.body.name;
    Village.destroy({
        where:{name:name}
    }).then(function () {
        res.json({
            message: "Village: " + name + " successfully removed",
            status: 200,
        });
    }).catch(Sequelize.ForeignKeyConstraintError, function(err){
        res.json({
            message : "There are still health facilities connected to the village",
            status : 400,
            error: err,
        });
    }).catch(function (err) {
        res.json({
            message: "Database error",
            error: err,
            status: 500
        });
    });
});
/*
    Returns all villages
*/
router.post('/getVillages',sessionCheckerAdmin, function(req, res){
    Village.findAll().then(result=>{
        res.send(result);
        res.end();
    }).catch(function (err) {
        res.json({
            message: "Database error",
            error: err,
            status: 500
        });
    });
});

module.exports = router;