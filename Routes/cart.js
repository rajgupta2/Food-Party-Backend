const express = require('express');
const ObjectId = require("mongodb").ObjectId;
const {Colls_Cart} = require('../Models/DB');

const cart = express();

cart.route("/")
    .get((req, res) => {
        Colls_Cart.find({ Email: req.body.Email }).then((data) => {
            res.json({ statusCode: 200, data: data });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).post((req, res) => {
        const newCart = new Colls_Cart({
            Email: req.body.Email,
            Item_id: req.body.Item_id,
            Quantity: req.body.Quantity
        });
        newCart.save().then(() => {
            res.json({ statusCode: 200, message: 'Food item added successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).put((req, res) => {
        const cart_id = req.body.id;
        Colls_Cart.updateOne({ _id: new ObjectId(cart_id) }, { Quantity: req.body.Quantity }).then(() => {
            res.json({ statusCode: 200, message: 'Food item updated successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });

    }).delete((req, res) => {
        Colls_Cart.deleteOne({ _id: req.body.id }).then(() => {
            res.json({ statusCode: 200, message: 'Food item deleted successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    })

module.exports = cart;