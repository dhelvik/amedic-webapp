const express = require('express');
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
//Routes to users/register
router.get('/register', function (req, res) {
    res.render('registerUser');
});

//Ajax Request to register AMEDUser
router.post('/register', function (req, res) {
    var user = AMEDUser.create({
        name: req.body.name,
        password: req.body.password,
        login_id: req.body.loginID,
        role: req.body.role,
        hsa_flag: req.body.hsaFlag,
        health_expert_flag: req.body.heFlag,
        admin_flag: req.body.adminFlag,
        mobile_no: req.body.mobileNo,
        date_of_birth: req.body.dateOfBirth,
        national_id: req.body.nationalID,
        email: req.body.email,
        health_facility_name: req.body.healthFacility
    }).then(function (item) {
        res.json({
            Message: "Created item.",
            Status: 200,
            Item: user
        });
    }).catch(function (err) {
        console.log(err)
        res.json({
            Error: err,
            Status: 500

        });
    });

});

//Ajax request to find AMEDUser like
router.post('/findUserLike', function (req, res) {
    AMEDUser.findAll({
        where: {
            $or: {
                name: {
                    $like: '%' + req.body.searchText + '%'

                },
                login_id: {
                    $like: '%' + req.body.searchText + '%'

                }
            }


        }
    }).then(result => {
            res.send(result);
        }
    )
});

//Ajax request to find User Profile
router.post('/findUser', function (req, res) {
    AMEDUser.findOne({
        where: {
            ID: req.body.id
        }
    }).then(result => {
        res.send(result);


    })
});

//Ajax request update user
router.post('/updateUser', function (req, res) {
    console.log(req.body.userName+req.body.userRole);
    AMEDUser.update({
        name: req.body.userName,
        role: req.body.userRole,
        hsa_flag : req.body.hsaFlag,
        health_expert_flag : req.body.heFlag,
        admin_flag: req.body.adminFlag
    },
    {
        where: {
            login_id : req.body.userLoginID}});
    res.end();
});

//Ajax request to delete user
router.post('/removeUser', function(req, res){
AMEDUser.destroy({
   where: {id: req.body.id}
});
    res.end();
});

module.exports = router;