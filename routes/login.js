const express = require('express');
const router = express.Router();
const AMEDUser = require('../models/AMEDUser');
var bcrypt = require('bcryptjs');
var cookieParser = require('cookie-parser');
var session = require('express-session');

router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('../');
    } else {
        res.render('login');
    }
})
    .post('/', (req, res, next) => {
        var username = req.body.username,
            password = req.body.password;

        AMEDUser.findOne({where: {loginID: username}}).then(function (user) {
            if (!user || !bcrypt.compareSync(password, user.password)) {
                console.log("Failed login from username: " + username);
                res.json({
                    error: "Username and password does not match.",
                    status: 500
                });
            } else {
                req.session.user = user.dataValues;
                console.log(username + " logged in successfully.");
                res.json({status: "Success", redirect: '/'});
            }
        }).catch(function (err) {
            console.log(err)
            res.json({
                error: err,
                status: 500

            });
        });

    });


module.exports = router;
