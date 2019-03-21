const express = require('express');
const router = express.Router();
const db = require('../connect');
const Patient = require('../models/Patient');
const AMEDUser = require('../models/AMEDUser');
const sessionCheckerAdmin = require('../scripts/sessionCheckerAdmin.js');

//Gets all users and routes to /user

router.get('/', sessionCheckerAdmin, (req, res) =>

    AMEDUser.findAll().then(result => {
        res.render('showUsers', {
            result
        })
    })
)
//Routes to users/register
router.get('/register', sessionCheckerAdmin, function (req, res) {
    res.render('registerUser');
});


//Ajax Request to register AMEDUser
router.post('/register', sessionCheckerAdmin, function (req, res) {
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
            message: "User added",
            status: 200,
            item: user
        });
    }).catch(Sequelize.UniqueConstraintError, function (err) {
        res.json({
            message: "A user with the same name already exists",
            status: 400
        });
    }).catch(function (err) {
        console.log(err)
        res.json({
            error: err,
            status: 500,
            message: "Database error"
        });
    });
});

//Ajax request to find AMEDUser like
router.post('/findUserLike', sessionCheckerAdmin, function (req, res) {
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
router.post('/findUser', sessionCheckerAdmin, function (req, res) {
    AMEDUser.findOne({
        where: {
            ID: req.body.id
        }
    }).then(result => {
        res.send(result);


    })
});

//Ajax request update user

router.post('/updateUser', sessionCheckerAdmin, function (req, res) {
    console.log(req.body.userName + req.body.userRole);
    AMEDUser.update({
            name: req.body.userName,
            role: req.body.userRole,
            hsa_flag: req.body.hsaFlag,
            health_expert_flag: req.body.heFlag,
            admin_flag: req.body.adminFlag
        },
        {
            where: {
                login_id: req.body.userLoginID
            }
        })
        .then(function () {
            res.json({
                status: 200,
            });
        }).catch(function (err) {
        console.log(err)
        res.json({
            error: err,
            status: 500
        });

    });
});

//Ajax request to delete user

router.post('/removeUser', sessionCheckerAdmin, function (req, res) {
    AMEDUser.destroy({
        where: {id: req.body.id}
    });
    res.end();
});

module.exports = router;