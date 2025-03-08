const mongoose = require('mongoose');

const d = new Date();
const Cart_Schema = mongoose.Schema({
    _User: {
        type: String,
        ref: 'Colls_User',
        required: true
    },
    _MenuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Colls_MenuItems',
        required: true
    },
    Quantity: {
        type: Number,
        required: true,
        min: 1,
        default:1
    }
});


module.exports = Cart_Schema;
