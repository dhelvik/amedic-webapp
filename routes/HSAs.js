const express = require('express');
const router = express.Router();
const HSA = require('../models/HSA');

//Takes user to table of HSAs
router.get('/', function(req, res){
    HSA.findAll().then( result => {
        res.render('showHSA', {
            result: result
        });

    })
})
module.exports = router;