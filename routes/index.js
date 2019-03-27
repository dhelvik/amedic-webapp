const express = require('express');
const router = express.Router();
const sessionChecker = require('../scripts/sessionChecker.js');

/*
    Routes the default page to searchPatient
 */
router.get('/', sessionChecker, function(req, res){
    res.render('searchPatient');
});
module.exports=router;