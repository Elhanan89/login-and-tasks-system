const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const authJwt = require("./authJWT");
const {Tasks} = require("../modelsForDB/tasksSchema");



router.get('/', authJwt, async (req, res) => {
    const querytasks = await Tasks.find();
    console.log(querytasks);
    res.send(querytasks);
});

router.post('/createTask', authJwt, async (req, res) => {
    console.log('Hii');
});



module.exports = router;