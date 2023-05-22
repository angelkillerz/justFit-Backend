const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        lowercase: true
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    profileImage: {
        type: String,
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: String,
    },
})

const User = mongoose.model('User', userSchema);
module.exports = { User }
