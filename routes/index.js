const express = require('express');
const router = express.Router();
//Index
router.get('/', function(req, res){
    res.render('index');
});
module.exports=router;