const express = require('express');
const router = express.Router();
const AMEDUser = require('../models/AMEDUser');
var bcrypt = require('bcryptjs');

/*
    Default route for login, redirects if the user is already logged in
 */
router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('../');
    } else {
        res.render('login');
    }
});
/*
    Checks if the inserted password matches the database password hash, if successful it updates the last login and redirects to index
 */
router.post('/', (req, res, next) => {
    var username = req.body.username,
        password = req.body.password;

    AMEDUser.findOne({where: {login_id: username}}).then(function (user) {
        if (!user || !bcrypt.compareSync(password, user.password)) {
            console.log("Failed login from username: " + username);
            res.json({
                error: "Username and password does not match.",
                status: 500
            });
        } else if(!(user.health_expert_flag || user.admin_flag)){
            console.log("Failed login from username: " + username);
            res.json({
                error: "User does not meet the required roles to access the system.",
                status: 500
            });
        }else {
            req.session.user = user.dataValues;
            console.log(username + " logged in successfully.");
            user.update({
                last_login: Date.now()
            }).then(() => {
            });
            res.json({status: "Success", redirect: '/'});
        }
    }).catch(function (err) {
        console.log(err);
        res.json({
            message: "Database error",
            error: err,
            status: 500
        });
    });
});


module.exports = router;
