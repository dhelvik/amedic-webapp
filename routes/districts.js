const express = require('express');
const router = express.Router();
const District = require('../models/District');
const Village = require('../models/Village');
router.get('/', (req, res) =>
    District.findAll().then(result => {
        res.render('districts', {
            result
        })
    })
);

router.post('/findVillages', (req, res) =>
        Village.findAll().then( result => {
            res.send(result);
            })
);

router.post('/addVillage', function(req, res) {
    const newVillage = Village.create({
        name: req.body.villageName,
        districtName: req.body.districtName

    }).then(function(item){
        console.log(newVillage);
        res.json({
            Message : "Created item.",
            Status : 200,
            Item : newVillage
        });
    }).catch(function(err){
        res.json({
            Error : err,
            Status : 500

        });
    });
});

module.exports = router;