const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { v5 } = require("uuid");

// To Import the pattern of the users:
const {Users} = require("../modelsForDB/schema");
const {Login} = require("../modelsForDB/schema");

// Map is like dict in Python, we have key and value:
const SESSION = new Map();

const sessionId = v5;
console.log(sessionId);




module.exports = router;