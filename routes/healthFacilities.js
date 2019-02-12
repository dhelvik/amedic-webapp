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



module.exports = router;