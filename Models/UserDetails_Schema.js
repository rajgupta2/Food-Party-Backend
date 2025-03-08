const mongoose = require('mongoose');

const UserDetails_Schema=mongoose.Schema({
    Name:String,
    Phone:String,
    _User:{
        type:mongoose.Schema.Types.ObjectId,
        unique:true,
        ref:'Colls_User'
    }
});

module.exports = UserDetails_Schema;