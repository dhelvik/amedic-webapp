const express = require ('express');
const router = express.Router();
const Village = require('../models/Village');
exports.get = (req, res) => {

    Village.getAll((villages) => {
        res.send(villages);
    });
};

// TEST INGET SOM ANVÄNDS