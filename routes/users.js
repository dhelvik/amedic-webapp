const express = require('express');
const router = express.Router();
const AMEDUser = require('../models/AMEDUser');
const sessionCheckerAdmin = require('../scripts/sessionCheckerAdmin.js');
const Sequelize = require('sequelize');

/*
    Default route for the edit user page, renders it with all users prefetched
*/
router.get('/', sessionCheckerAdmin, (req, res) =>
    AMEDUser.findAll().then(result => {
        res.render('editUsers', {
            result
        })
    })
);

/*
    Registers a new AMED user, returns an error if the user already exists
*/
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
            message: "User successfully added",
            status: 200,
            item: user
        });
    }).catch(Sequelize.UniqueConstraintError, function (err) {
        res.json({
            message: "A user with the same name already exists",
            status: 400
        });
    }).catch(function (err) {
        console.log(err);
        res.json({
            error: err,
            status: 500,
            message: "Database error"
        });
    });
});

/*
    Returns users that matches the searchtext
*/
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
    ).catch(err => {
        res.json({
            message: "Database error",
            error: err,
            status: 500
        });
    });
});

/*
    Returns a user with a specific ID
*/
router.post('/findUser', sessionCheckerAdmin, function (req, res) {
    AMEDUser.findOne({
        where: {
            ID: req.body.id
        }
    }).then(result => {
        res.send(result);
    }).catch(function (err) {
        res.json({
            error: err,
            message: "Database error",
            status: 500
        });
    });
});

/*
    Updates a user with a specific login_id
*/
router.post('/updateUser', sessionCheckerAdmin, function (req, res) {
    AMEDUser.findOne({
        where: {
            ID: req.body.ID
        }
    }).then((user) => {
        user.name = req.body.userName;
        user.role = req.body.userRole;
        user.hsa_flag = req.body.hsaFlag;
        user.health_expert_flag = req.body.heFlag;
        user.admin_flag = req.body.adminFlag;
        user.login_id = req.body.userLoginID;
        if(req.body.password !== ""){
            user.password = req.body.password;
            user.hashPassword();
        }
        user.save();
        res.send({
            status: 200,
            message: "User updated"
        });
    }).catch(Sequelize.UniqueConstraintError, function(err){
        res.json({
            message : "A user with the same login name already exists",
            status : 400
        });
    }).catch((err) => {
        console.log(err);
        res.json({
            error: err,
            status: 500,
            message: "Database error",
        });
    });
});

/*
    Removes a user with a specific id
*/
router.post('/removeUser', sessionCheckerAdmin, function (req, res) {
    AMEDUser.destroy({
        where: {id: req.body.id}
    }).then(function () {
        res.json({
            message: "User successfully removed",
            status: 200
        });
    }).catch(function (err) {
        console.log(err);
        res.json({
            error: err,
            status: 500,
            message: "Database error",

        });
        res.end();
    });
});

module.exports = router;