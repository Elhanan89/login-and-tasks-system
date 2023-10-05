//basic:
const express = require("express");
const app = express();
const port = 3000;

// Another Packages:
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// end

dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser());

//Import Routes:
const routesRegister = require("./routes/createUsers");
const routesLoginSession = require("./routes/loginSession");
const routesLoginJWT = require("./routes/loginJWT");
const routesUserQuery = require("./routes/userQuery");

//Middlewhere:
app.use('/register', routesRegister);
app.use('/loginSession', routesLoginSession);
app.use('/loginJWT', routesLoginJWT);
app.use('/query', routesUserQuery);


// listining to the server:
app.listen(port, (req, res) => {
    console.log("API Server Is Running on port: "+ port);
});


// Connect to DB:
mongoose.connect(process.env.USERSCLUSTER_DB_CONNECT)
    .then( ()=> console.log("Connectted to DB!") )
    .catch( (err) => { console.log(err); } );
