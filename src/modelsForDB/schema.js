const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator").default;


// We now create a schema, 
// Now, what the schema means -> it just represents how that file("schema.js") looks, 
// so maybe it has a title and that's a string, maybe it has some description. 
// I'm kind of describe the way my data looks. 

const user = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => {
            return validator.isEmail(value);
        } 
    },
    createdUser: {
        type: Date,
        default: Date.now
    },
},
{timestamps: true}
);

const login = new mongoose.Schema({
    userID:{
        type: ObjectId,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


// API structure of mongoose.model work like this:
// "Mongoose#model(name, [schema], [collection], [skipInit])", fo example:
// var M = mongoose.model('Actor', schema, collectionName);
const usersSchema = mongoose.model("users", user);
const loginSchema = mongoose.model("login", login, "login");


module.exports = {Users: usersSchema, Login: loginSchema};