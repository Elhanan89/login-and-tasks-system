const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bycrypt = require("bcrypt");

// To Import the pattern of the users:
const {Users} = require("../modelsForDB/schema");
const {Login} = require("../modelsForDB/schema");



router.post('/', async (req, res) => {
    const hashPassword = await bycrypt.hash(req.body.password, 10);

    // Why not using ".insertOne()" -> because its just insert the body you request to insert,
    // if you had some fields that should automaticlly fill, it won't be filled because of this function.
    // it took only what you inserted!.
    const userCreate = await Users.create(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mail: req.body.mail
        }
    ).catch( (err)=> {console.log(err);} );
    if (!userCreate) return res.send("-- User is not created --");
    // Create the login:
    await Login.create(
        {
            userID: userCreate._id,
            userName: req.body.userName,
            password: hashPassword
        }
    );
    res.status(200).send("User Created");
});



module.exports = router;