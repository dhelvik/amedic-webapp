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
        loginID: req.body.loginID,
        role: req.body.role
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


module.exports = router;