const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    activityType : {
        type: String,
        // required: true
    },
    title : {
        type: String,
        // required: true
    },
    dateTime : {
        type: Date,
        // required: true
    },
    duration : {
        type: Number,
        // required: true
    },
    energyBurn : {
        type: Number,
        // required: false
    },
    distance : {
        type: Number,
        // required: false
    },
    description : {
        type: String,
        // required: false
    },
    userId : {
        type: String,
        // required: true
    },
});


const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = { Activity }