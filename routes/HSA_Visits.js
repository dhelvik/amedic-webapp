const express = require('express');
const router = express.Router();
const HSA_Visit = require('../models/HSA_visit');

router.post('/', function(req, res){
    HSA_Visit.findAll({where: {patientID:req.body.id}}).then(result =>{
        res.send(result);
    })
});
module.exports = router;