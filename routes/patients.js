const express = require ('express');
const router = express.Router();
const db = require('../connect');
const Patient = require('../models/Patient');
const AMEDUser = require('../models/AMEDUser');
const Village = require('../models/Village');
const Visit = require('../models/Visit');
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
    Village.findAll({
        order: [
        ['name', 'ASC']
    ],
    }).then(result=>{
        res.render('registerPatient',{
            result: result
        })
    })
});
//register patient
router.post('/register', function(req, res) {
    const newPatient = Patient.create({
        name: req.body.name + " " + req.body.lastName,
        national_id: req.body.nationalID,
        mobile_no: req.body.mobileNo,
        sex: req.body.sex,
        date_of_birth: req.body.dateOfBirth,
        village_name: req.body.villageName
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
    Patient.findOne({where: {national_id:req.body.id}}).then(Patient =>{
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
            national_id: req.body.nationalID,
            mobile_no: req.body.mobileNo,
            sex: req.body.sex,
            village_name: req.body.villageName,
            date_of_birth: req.body.dateOfBirth},
        {where: {id : req.body.id}});
});
//TEST AV NY SIDA
router.get('/:id', function(req, res) {
    var Patient = require('../models/Patient');
    var HSA_Visit = require('../models/HSA_visit');
    console.log(req.body);
    Patient.findOne(
        {where: {national_id: req.params.id}}).then(patient => {
        console.log(patient);
        Visit.findAll(
            {where: {patient_id: patient.id}
            }).then(records => {
            res.render('records', {
                result: patient,
                records: records
            });
            res.end();
        });
    });
});


module.exports=router;
