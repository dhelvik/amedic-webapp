const express = require('express');
const router = express.Router();
const District = require('../models/District');
const Village = require('../models/Village');
const sessionChecker = require('../scripts/sessionChecker.js');
const sessionCheckerAdmin = require('../scripts/sessionCheckerAdmin.js');


router.get('/', sessionCheckerAdmin, (req, res) =>
        res.render('districts')
    );


router.get('/getDistricts', sessionChecker, (req, res) =>
    District.findAll().then(result => {
        res.send(result);
    })
);

router.post('/addDistrict', sessionCheckerAdmin, function(req, res) {
    const newDistrict = District.create({
        name: req.body.name

    }).then(function(item){
        console.log(newDistrict.name);
        res.json({
            message : "Created item.",
            status : 200,
            item : newDistrict
        });
    }).catch(function(err){
        res.json({
            error : err,
            status : 500

        });
    });
});




module.exports = router;