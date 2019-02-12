const express = require ('express');
const router = express.Router();
const db = require('../connect');
const Patient = require('../models/Patient');
const AMEDUser = require('../models/AMEDUser');
const Village = require('../models/Village');
const Villages = require('./Villages');

router.get('/', (req, res) =>
// Gets all patients
Patient.findAll().then(result => {
    res.render('showPatient', {
        result
    })
})
)
//Gets all villages page on load
router.get('/register', function(req, res){
    //router.post('/register', Villages.getAll);
    Village.findAll().then(result=>{
        res.render('registerPatient',{
            result: result
        })
    })
});
//register patient
router.post('/register', function(req, res) {
    const newPatient = Patient.create({
        name: req.body.name + " " + req.body.lastName,
        nationalID: req.body.nationalID,
        mobileNo: req.body.mobileNo,
        sex: req.body.sex,
        dateOfBirth: req.body.dateOfBirth,
        villageName: req.body.villageName
    }).then(function(item){
        console.log(newPatient);
        res.json({

            Message : "Created item.",
            Status : 200,
            Item : newPatient
        });
    }).catch(function (err) {
        console.log(err)
        res.json({
            Error : err,
            Status : 500

        });
    });

});
//Find specific patient
router.post('/', function(req, res){
    var result = [];
    Patient.findOne({where: {nationalID:req.body.id}}).then(Patient =>{
        if(Patient!=null){
            result.push(Patient);
            Village.findAll().then( villages =>{
                result.push(villages);
                res.send(result);
                res.end();
            })
        } else{
            res.end();
        }
    })

});
//Delete Patient
router.post('/deletePatient', function(req, res){
    Patient.destroy({
        where: {id:req.body.id}
    })

})
//Update Patient
router.post('/updatePatient', function(req, res){
    console.log(req.body.id);
    Patient.update({
            name: req.body.name,
            nationalID: req.body.nationalID,
            mobileNo: req.body.mobileNo,
            sex: req.body.sex,
            villageName: req.body.villageName,
            dateOfBirth: req.body.dateOfBirth},
        {where: {id : req.body.id}});
});
module.exports=router;
