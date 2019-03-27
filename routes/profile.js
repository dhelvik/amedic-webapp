const express = require('express');
const router = express.Router();
const AMEDUser = require('../models/AMEDUser');
const sessionChecker = require('../scripts/sessionChecker.js');
const bcrypt = require('bcryptjs');

/*
    Default route for user profile, redirects to login if no user is logged in
*/
router.get('/', sessionChecker, function (req, res) {
    if (req.session.user) {
        res.render('userProfile')
    } else (
        res.redirect('./login')
    )

});

/*
    Updates the logged in user
*/
router.post('/updateUser', sessionChecker, function (req, res) {
    AMEDUser.update({
            name: req.body.name,
            email: req.body.email
        },
        {
            where: {
                ID: req.session.user.ID
            }
        })
        .then(function () {
            res.json({
                status: 200,
                message: "User successfully updated"
            });
        }).catch(function (err) {
        console.log(err);
        res.json({
            error: err,
            status: 500,
            message: "Database error",
        });

    });
});
/*
    Updates the logged in users password
*/
router.post('/updateUserPassword', sessionChecker, function (req, res) {
    if (bcrypt.compareSync(req.body.oldPassword, req.session.user.password)) {
        AMEDUser.findOne({
            where: {
                ID: req.session.user.ID
            }
        }).then((newUser) => {
            newUser.password = req.body.newPassword;
            newUser.hashPassword();
            newUser.save();
            req.session.user = newUser.dataValues;
            res.send({
                status: 200,
                message: "Password updated"
            });
        }).catch((err) => {
            console.log(err);
            res.json({
                error: err,
                status: 500,
                message: "Database error",
            });
        });
    } else {
        res.send({
            message: "Incorrect current password",
            status: 500
        });
    }
});

module.exports = router;