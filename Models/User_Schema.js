const mongoose = require('mongoose');

const User_Schema = mongoose.Schema({
    Email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    Password:{
        type: String,
        required: true
    },
    Type:{
        type: String,
        required: true,
        enum: ['restaurant owner', 'user', 'delivery agent'], // Restricting values
        lowercase: true, // Ensures stored values are always lowercase
        trim: true // Removes whitespace
    }
});

module.exports =User_Schema;
