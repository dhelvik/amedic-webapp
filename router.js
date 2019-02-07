var express = require('express');
var router = express.Router();
var con = require('./connect');

//Gets a list of all Patients
router.get('/patients', function(req, res){
    var Patient = require('./models/Patient');
    Patient.findAll().then(result =>{
        res.render('showPatient', {
            result: result
        })
    })

});
//Find specific patient
router.post('/findPatient', function(req, res){
    var Patient = require('./models/Patient');
    Patient.findOne({where: {nationalID:req.body.id}}).then(result =>{
       res.send(result);
       res.end();
        })
    });

//Update a patient
router.post('/updatePatient', function(req, res){
    var Patient = require('./models/Patient');
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
//Delete a patient
router.post('/deletePatient', function(req, res){
    var Patient = require('./models/Patient');
    Patient.destroy({
        where: {id:req.body.id}
    })

})
//Ajax Request to register AMEDUser
router.post('/registerUser', function(req, res) {
    var AMEDUser = require('./models/AMEDUser');
    const user = AMEDUser.create({
        name: req.body.name,
        password: req.body.password,
        loginID: req.body.loginID,
        role: req.body.role
    }).then(function(item){
        res.json({
            Message : "Created item.",
            Status : 200,
            Item : user
        });
    }).catch(function (err) {
        console.log(err)
        res.json({
            Error : err,
            Status : 500

        });
    });

});




//Gets a list of all users
router.get('/users', function(req, res){
    var AMEDUser = require('./models/AMEDUser');
    AMEDUser.findAll().then(result => {
        res.render('showUsers',{
            result: result
        })
    })

});

//Index
router.get('/', function(req, res){
    res.render('index');
});

router.get('/folke', function (req, res) {
    var AMEDUser = require('./models/AMEDUser');
    AMEDUser.findAll().then(asd => {
        res.send(asd),
            res.end()
    });
});


//Takes user to registerUser
router.get('/registerUser', function(req, res){
    res.render('registerUser');
});

//Takes user to regsiterPatient
router.get('/registerPatient', function(req, res){
    var HealthFacility = require('./models/HealthFacility')
    HealthFacility.findAll().then(result=>{
        res.render('registerPatient',{
            result: result
        })
    })
});

//Takes user to registerHealthFacility
router.get('/registerHealthFacility', function(req, res){
    var Village = require('./models/Village')
    Village.findAll().then(result=>{
        res.render('registerHealthFacility',{
            result: result
        })
    })

});

//Takes user to table of HSAs
router.get('/showHSA', function(req, res){
    var HSA = require('./models/HSA');
    HSA.findAll().then( result => {
        res.render('showHSA', {
            result: result
        });

    })
})

router.get('/showHealthFacility', function(req, res){
    var HealthFacility = require('./models/HealthFacility')
    HealthFacility.findAll().then(result=>{
        res.render('showHealthFacility', {
            result: result
        });
    })
})


module.exports = router;