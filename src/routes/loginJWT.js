const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");

// To Import the pattern of the users an login:
const {Users} = require("../modelsForDB/schema");
const {Login} = require("../modelsForDB/schema");
const { isEmpty } = require("lodash");


// Functions:
async function getUserIdByMail(mail) {
    const user_id = await Users.find({mail: mail}).select('_id');
    return user_id;
}


// Routes:
// Here I check the user password to the hash key in the db, the send JWT token
router.post('/', async (req, res) => {
    let userPassword;
    const userID = await getUserIdByMail(req.body.mail);
    const userLoginInfo = await Login.find({userID: userID}, {_id:0, password:1});
    if (!userLoginInfo || isEmpty(userLoginInfo) ) return res.status(404).send("user not found");

    userLoginInfo.forEach( (obj) => {
        userPassword = obj.password;
    });

    let queryFindUserById = await Users.find({_id: userID}, {firstName:1, lastName:1, mail:1, _id:0}, {plain: true}).exec();
    let userDetailsForToken = queryFindUserById[0];
    
    // Compare between Password:
    const validPass = await bycrypt.compare(req.body.password, userPassword);
    if (!validPass) return res.status(400).send("User Name or Password is not correct");

    // Jwt:
    const JWT = jwt.sign(
        {firstName: userDetailsForToken.firstName, lastName: userDetailsForToken.lastName, mail: userDetailsForToken.mail}, 
        process.env.ACCESS_TOKEN_SECRET,
        {algorithm: 'HS256'}
    );
    res.header('auth-token', JWT).send("Logged In!");

});



module.exports = router;