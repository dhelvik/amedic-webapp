const express = require ('express');
const router = express.Router();
const HealthFacility = require('../models/HealthFacility');
const Village = require('../models/Village');
const sessionCheckerAdmin = require('../scripts/sessionCheckerAdmin.js');


router.get('/',sessionCheckerAdmin, function(req, res){
    HealthFacility.findAll().then(result=>{
        res.render('showHealthFacility', {
            result: result
        });
    })
})

router.get('/registerHealthFacility',sessionCheckerAdmin, function(req, res){
    Village.findAll().then(result=>{
        res.render('registerHealthFacility',{
            result: result
        })
    })

});
router.post('/registerHealthFacility',sessionCheckerAdmin, function(req, res){
    console.log(req.body.villageName);


    const healthFacility = HealthFacility.create({
       name: req.body.name,
       village_name: req.body.villageName
    }).then(function(item){
        console.log(healthFacility);
        res.json({

            message : "Created item.",
            status : 200,
            item : healthFacility
        });
    }).catch(function (err) {
        console.log(err)
        res.json({
            error : err,
            status : 500

        });
    });


});
router.post('/getHealthFacilities',sessionCheckerAdmin, function(req, res){
    HealthFacility.findAll().then(result=>{
        res.send(result);
        res.end;
    }).catch( err => {
        res.json({
            error: err,
            status: 500
        })
    })

});

//Ajax request to find HealthFacility like
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
            error: err,
            status: 500
        });
    });
});

//Ajax request to find Health Facility
router.post('/findHealthFacility', function (req, res) {
    HealthFacility.findOne({
        where: {
            name: req.body.id
        }
    }).then(result => {
        res.send(result);


    }).catch( err => {
        res.json({
            error: err,
            status: 500
        });
    });
});

//Ajax request to delete user
router.post('/removeHealthFacility', function(req, res){
    HealthFacility.destroy({
        where: {name: req.body.id}
    }).then(() => {
        res.send({
            status: 200
            });
    }).catch( err => {
        res.json({
            error: err,
            status: 500
        });
    });
});



module.exports = router;