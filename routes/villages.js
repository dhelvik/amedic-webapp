const express = require ('express');
const router = express.Router();
const Village = require('../models/Village');
const sessionCheckerAdmin = require('../scripts/sessionCheckerAdmin.js');
const sessionChecker = require('../scripts/sessionChecker.js');



router.post('/findVillages',sessionChecker, function(req, res) {
    Village.findAll({
        where: {district_name: req.body.districtName},

    }).then(result => {
        res.send(result);
    });
});

router.post('/addVillage',sessionCheckerAdmin, function(req, res) {
    const newVillage = Village.create({
        name: req.body.villageName,
        district_name: req.body.districtName

    }).then(function(item){
        console.log(newVillage);
        res.json({
            message : "Created item.",
            status : 200,
            item : newVillage
        });
    }).catch(function(err){
        console.log("ERROR");

        console.log(err);
        res.json({
            error : err,
            status : 500

        });
    });
});

router.post('/removeVillage',sessionCheckerAdmin, function(req,res){
    const name = req.body.name;
    Village.destroy({
        where:{name:name}
    }).then(function () {
        res.json({
            status: 200,
        });
    }).catch(function (err) {
        res.json({
            error: err,
            status: 500
        });

    });

});


router.post('/getVillages',sessionCheckerAdmin, function(req, res){
    Village.findAll().then(result=>{
        res.send(result);
        res.end;
    })

});


module.exports = router;