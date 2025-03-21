const mongoose = require('mongoose');

const d = new Date();
const Orders_Schema = mongoose.Schema({
    OrderDate: {
        type: String,
        default: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()+ ` ${d.getHours()}:${d.getMinutes()}`
    },
    Customer:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Colls_UserDetails'
    },
    Restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Colls_Restaurant'
    },
    DeliveryAddress:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Colls_User_Address',
        required: true
    },
    Status: {
        type: String,
        enum: ['Pending', 'Accept', 'Ready', 'Cancelled','Delivered'],
        default: 'Pending'
    },
    paymentMethod: String,
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    Items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Colls_MenuItems',
                required: true
            },
            Quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
});


module.exports = Orders_Schema;


