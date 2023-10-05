const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");


const taskMission = new mongoose.Schema( {
    userID: {
        type: ObjectId,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    taskTitle: {
        type: String,
        required: true
    },
    describeTask: {
        type: String,
        required: false
    },
    taskStatus: {
        type: String,
        required: true
    }
});


const taskSchema = mongoose.connection.useDb("tasks-cluster").model("task", taskMission, "tasks");
module.exports = {Tasks: taskSchema};