var express = require('express');
var router = express.Router();
var con = require('./connect');

router.get('/patients', function(req, res){
    var Patient = require('./models/Patient');
    Patient.findAll().then(result =>{
        res.render('showPatient', {
            result: result
        })
    })

});
router.get('/users', function(req, res){
    var AMEDUser = require('./models/AMEDUser');
    AMEDUser.findAll().then(result => {
        res.render('showUsers',{
            result: result
        })
    })

});

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

router.get('/registerUser', function(req, res){
    res.render('registerUser');
});
router.get('/registerPatient', function(req, res){
    res.render('registerPatient');
});
router.get('/registerHealthFacility', function(req, res){
    res.render('registerHealthFacility');
});
router.get('/showHSA', function(req, res){
    var HSA = require('./models/HSA');
    HSA.findAll().then( result => {
        res.render('showHSA', {
            result: result
        });

    })
})

router.post('/add', function(req, res){
    var newItem = req.body.newItem;
    todoItems.push({
        id: todoItems.length+1,
        desc: newItem
    });
    res.redirect('/');
});

module.exports = router;