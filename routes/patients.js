const express = require ('express');
const router = express.Router();
const db = require('../connect');
const Patient = require('../models/Patient');
const AMEDUser = require('../models/AMEDUser');

router.get('/', (req, res) =>

Patient.findAll().then(result => {
    res.render('showUsers', {
        result
    })
})
)

module.exports=router;
