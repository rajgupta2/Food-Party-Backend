const mongoose = require('mongoose');

const Offer_Schema = mongoose.Schema({
    Title: String,
    Description: String,
    Dis_Type: String,
    Discount: String,
    Min_Order: String,
    StartDate: String,
    EndDate: String,
    _Restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Colls_Restaurant'
    },
});


module.exports = Offer_Schema;
