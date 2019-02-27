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

router.post('/removeVillage', function(req,res){
    const name = req.body.name;
    Village.destroy({
        where:{name:name}
    });
    res.end();

});

module.exports = router;