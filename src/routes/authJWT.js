const JWT = require("jsonwebtoken");
const bycrypt = require("bcrypt");


module.exports = async function authenticateJWTToken(req, res, next) {
    const token = req.headers['auth-token'];
    console.log("@@@@@@@@@@@@ The Token is: "+ token);
    next();
} 
