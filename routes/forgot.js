const express = require('express');
const router = express.Router();
const AMEDUser = require('../models/AMEDUser');
var bcrypt = require('bcryptjs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var jwt = require('jwt-simple');
const nodemailer = require("nodemailer");


router.get('/', (req, res) => {
    res.render('forgot');
})

router.post('/', (req, res) => {
    AMEDUser.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {

            res.render('forgot', {
                message: 'No user with that email exists'
            });

            return;
        }
        var payload = {
            userId: user.ID,
            email: user.email
        };

        var secret = user.password;
        var token = jwt.encode(payload, secret);

        console.log(token);
        console.log(jwt.decode(token, secret));


        async function main() {

            let account = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: account.user, // generated ethereal user
                    pass: account.pass // generated ethereal password
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"A Medic" <no-reply@amedic.com>', // sender address
                to: user.email, // list of receivers
                subject: "Reset Password", // Subject line
                text: "Hello world?", // plain text body
                html: '<a href="localhost:3000/forgot/' + payload.userId + '/' + token + '">Reset Password</a>' // html body
            };

            // send mail with defined transport object
            let info = await transporter.sendMail(mailOptions)

            console.log("Message sent: %s", info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main();
        res.render('forgot', {
            message: 'Password reset mail sent'
        })

    }).catch(err => {
        res.send({
            error: err,

        });
    });
});

router.get('/:id/:token', (req, res) => {


    AMEDUser.findOne({
        where: {
            ID: req.params.id,
        }
    }).then((user) => {
        const secret = user.password;
        var payload = jwt.decode(req.params.token, secret);
        console.log(payload);

        //Makes sure user can't press back and re-use the JWT Token to reset password
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render('resetPassword',
            {
                id: payload.userId,
                token: req.params.token

            });

    }).catch((err) => {
        res.send({
            error: err,
            message: 'Reset link expired'


        });
    });

    });



router.post('/resetPassword', (req, res) => {

    AMEDUser.findOne({
        where: {
            ID: req.body.id
        }
    }).then((model) => {
        model.password = req.body.password;
        const hashedUser = model.hashPassword();
        hashedUser.save();
    }).then(() => {
        res.render('forgot', {
            message: "Password has been reset."
        });
    }).catch((err) => {
        console.log(err);
        res.send({
            error: err,
            status: 500
        });


    });
});

module.exports = router;
