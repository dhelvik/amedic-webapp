const express = require ('express');
const router = express.Router();
const Visit = require('../models/Visit');
const Notes = require('../models/Notes');
//TEST AV NY SIDA
router.get('/:id', function(req, res) {
    Visit.findOne(
        {where: {ID: req.params.id}}).then(visit => {
        var result = [];
            result.push(visit);
            Notes.findAll({where: {visit_id: req.params.id}}).then(notes => {
                result.push(notes);
                res.render('visit',{
                    result: result
                });
            });

    });
});


module.exports = router;