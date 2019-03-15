const express = require('express');
const router = express.Router();
const sessionChecker = require('../scripts/sessionChecker.js');

//Index
router.get('/', sessionChecker, function(req, res){
    res.render('index');
});
module.exports=router;