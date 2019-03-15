const express = require ('express');
const router = express.Router();
const Village = require('../models/Village');

router.post('/findVillages',function(req, res) {
    Village.findAll({
        where: {district_name: req.body.districtName},

    }).then(result => {
        res.send(result);
    });
});

router.post('/addVillage', function(req, res) {
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
        res.json({
            error : err,
            status : 500

        });
    });
});

router.post('/removeVillage', function(req,res){
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

router.post('/getVillages', function(req, res){
    Village.findAll()
        .then(result=>{
        res.send(result, {
            status: 200
        });
    }).catch(function (err) {
        res.json({
            error: err,
            status: 500
        });

    });

});


module.exports = router;