const express = require('express');
const router = express.Router();
const District = require('../models/District');
const Village = require('../models/Village');
router.get('/', (req, res) =>
    District.findAll().then(result => {
        res.render('districts', {
            result
        })
    })
);

router.post('/findVillages', (req, res) =>
        Village.findAll().then( result => {
            res.send(result);
            })
);

module.exports = router;