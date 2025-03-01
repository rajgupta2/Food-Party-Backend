const express = require('express');
const ObjectId = require("mongodb").ObjectId;
const {Colls_Orders} = require('../Models/DB');

const order = express();

order.route('/')
    .get((req, res) => {
        Colls_Orders.find({ Email: req.body.Email }).then((data) => {
            res.json({ statusCode: 200, data: data });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).post((req, res) => {
        const neworder = new Colls_Orders({
            OrderId: String,
            Customer: Colls_UserDetails,
            Restaurant: Colls_Restaurant,
            DeliveryAddress: String,
            Itmes: {
                Item_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Colls_MenuItems',
                    required: true
                },
                Quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            },
            Email: req.body.Email,
            Item_id: req.body.Item_id,
            Quantity: req.body.Quantity
        });
        neworder.save().then(() => {
            res.json({ statusCode: 200, message: 'You have ordered successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).put((req, res) => {
        const order_id = req.body.id;
        Colls_Orders.updateOne({ _id: new ObjectId(order_id) }, { Quantity: req.body.Quantity }).then(() => {
            res.json({ statusCode: 200, message: 'Order updated successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });

    }).delete((req, res) => {
        Colls_Orders.deleteOne({ _id: req.body.id }).then(() => {
            res.json({ statusCode: 200, message: 'Ordered deleted successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    })

module.exports = order;