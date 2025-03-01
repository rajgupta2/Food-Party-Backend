const mongoose = require('mongoose');

const Offer_Schema = mongoose.Schema({
    Title:String,
    Email:{
            type:String,
            ref:'Colls_Restaurant'
    },
    Discount: String,
    Validity: String,
    ImageUrl:String,
});


module.exports = Offer_Schema;
