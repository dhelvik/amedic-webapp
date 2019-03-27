const express = require ('express');
const router = express.Router();
const HealthFacility = require('../models/HealthFacility');
const sessionCheckerAdmin = require('../scripts/sessionCheckerAdmin.js');

/*
    Default route for health facilities admin page
 */
router.get('/',sessionCheckerAdmin, function(req, res){
    HealthFacility.findAll().then(result=>{
        res.render('editHealthFacilities', {
            result: result
        });
    })
});
/*
    Registers a new Health Facility
 */
router.post('/registerHealthFacility',sessionCheckerAdmin, function(req, res){
    console.log(req.body.villageName);
    const healthFacility = HealthFacility.create({
       name: req.body.name,
       village_name: req.body.villageName
    }).then(function(item){
        console.log(healthFacility);
        res.json({
            message : "Health facility added",
            status : 200,
            item : healthFacility
        });
    }).catch(Sequelize.UniqueConstraintError, function(err){
        res.json({
            message : "A health facility with the same name already exists",
            status : 400
        });
    }).catch(function (err) {
        console.log(err);
        res.json({
            message: "Database error",
            error : err,
            status : 500
        });
    });
});
/*
    Returns all Health Facilities
 */
router.post('/getHealthFacilities',sessionCheckerAdmin, function(req, res){
    HealthFacility.findAll().then(result=>{
        res.send(result);
        res.end;
    }).catch( err => {
        res.json({
            message: "Database error",
            error: err,
            status: 500
        })
    })

});

/*
    Returns Health Facilities that matches the searchText
 */
router.post('/findHFSLike', function (req, res) {
    HealthFacility.findAll({
        where: {
            $or: {
                name: {
                    $like: '%' + req.body.searchText + '%'
                },
                village_name: {
                    $like: '%' + req.body.searchText + '%'
                }
            }
        }
    }).then(result => {
        res.send(result);
    }).catch( err => {
        res.json({
            message: "Database error",
            error: err,
            status: 500
        });
    });
});
/*
    Returns a Health Facility that matches a specific ID
 */
router.post('/findHealthFacility', function (req, res) {
    HealthFacility.findOne({
        where: {
            name: req.body.id
        }
    }).then(result => {
        res.send(result);
    }).catch( err => {
        res.json({
            message: "Database error",
            error: err,
            status: 500
        });
    });
});
/*
    Removes a Health Facility with a specific ID
 */
router.post('/removeHealthFacility', function(req, res){
    HealthFacility.destroy({
        where: {name: req.body.id}
    }).then(() => {
        res.send({
            status: 200,
            message: "Health facility removed"
            });
    }).catch( err => {
        res.json({
            message: "Database error",
            error: err,
            status: 500
        });
    });
});



module.exports = router;