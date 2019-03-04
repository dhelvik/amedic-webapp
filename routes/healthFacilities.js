const express = require ('express');
const router = express.Router();
const HealthFacility = require('../models/HealthFacility');
const Village = require('../models/Village')
router.get('/', function(req, res){
    HealthFacility.findAll().then(result=>{
        res.render('showHealthFacility', {
            result: result
        });
    })
})

router.get('/registerHealthFacility', function(req, res){
    Village.findAll().then(result=>{
        res.render('registerHealthFacility',{
            result: result
        })
    })

});
router.post('/registerHealthFacility', function(req, res){
    const healthFacility = HealthFacility.create({
       name: req.body.name,
       village_name: req.body.villageName
    }).then(function(item){
        console.log(healthFacility);
        res.json({

            Message : "Created item.",
            Status : 200,
            Item : healthFacility
        });
    }).catch(function (err) {
        console.log(err)
        res.json({
            Error : err,
            Status : 500

        });
    });


});
router.post('/getHealthFacilities', function(req, res){
    HealthFacility.findAll().then(result=>{
        res.send(result);
        res.end;
    })

});



module.exports = router;