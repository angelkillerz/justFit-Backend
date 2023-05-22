const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    activityType : {
        type: String,
        // required: true
    },
    dateAdd: {
        type: Date,
        default: Date.now()
    },
    dateDone: {
        type: Date,
    },
    deadline : {
        type: Date,
        // required: true
    },
    energyBurn : {
        type: Number,
        // required: false
    },
    duration : {
        type: Number,
        // required: true
    },
    distance : {
        type: Number,
        // required: false
    },
    status : {
        type: String,
        // required: false
        enum: ["done", "cancel", "none"],
        default: "none",
    },    
    userId : {
        type: String,
        // required: true
    },
})

const Goal = mongoose.model('Goal', GoalSchema);
module.exports = { Goal }
