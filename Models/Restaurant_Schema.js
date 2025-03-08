const mongoose = require('mongoose');

const Restaurant_Schema=mongoose.Schema({
    Name:String,
    Description:String,
    Address:String,
    Contact:String,
    OperatingHours:String,
    Rating:String,
    CoverImage:String,
    _UserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Colls_User',
        unique: true
    }
});

module.exports=Restaurant_Schema;