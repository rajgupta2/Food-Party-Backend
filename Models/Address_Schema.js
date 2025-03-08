const mongoose=require('mongoose');

const Address_Schema=mongoose.Schema({
    Name:String,
    Street:String,
    City:String,
    PinCode:{
        type:Number,
        length: 6
    },
    _User:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Colls_User'
    }
});

module.exports = Address_Schema;