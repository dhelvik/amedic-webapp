const express = require ('express');
const router = express.Router();
const db = require('../connect');
const Patient = require('../models/Patient');
const AMEDUser = require('../models/AMEDUser');

//Gets all users and routes to /user

router.get('/', (req, res) =>

    AMEDUser.findAll().then(result => {
        res.render('showUsers', {
            result
        })
    })
)


module.exports=router;