const mongoose = require('mongoose');

const UserDetails_Schema=mongoose.Schema({
    Name:String,
    Phone:String,
    Email:{
        type:String,
        unique:true,
        ref:'Colls_User'
    }
});

module.exports = UserDetails_Schema;