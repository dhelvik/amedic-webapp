const express = require('express');
const router = express.Router();
const AMEDUser = require('../models/AMEDUser');
const sessionChecker = require('../scripts/sessionChecker.js');


//Gets all users and routes to /user

router.get('/', sessionChecker, function (req, res){
    if(req.session.user){
        res.render('userProfile')
    }else(
        res.redirect('./login')
    )

});

router.post('/updateUser', sessionChecker, function (req, res) {
    console.log(req.body.userName+req.body.userRole);
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

module.exports = router;