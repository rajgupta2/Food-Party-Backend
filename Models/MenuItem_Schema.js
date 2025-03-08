const mongoose = require('mongoose');

const MenuItem_Schema=mongoose.Schema({
    Name:String,
    Description:String,
    Price:Number,
    ImageUrl:String,
    _Restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Colls_Restaurant',
        required: true
    }
});

module.exports=MenuItem_Schema;

