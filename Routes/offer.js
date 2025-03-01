const express = require('express');
const ObjectId = require("mongodb").ObjectId;
const {Colls_Offer} = require('../Models/DB');

const offer = express();

offer.route('/')
    .get((req, res) => {
        Colls_Offer.find().then((data) => {
            res.json({ statusCode: 200, data: data });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).post((req, res) => {
        const newoffer = new Colls_Offer({
            Email: req.body.Email,
            Item_id: req.body.Item_id,
            Quantity: req.body.Quantity
        });
        newoffer.save().then(() => {
            res.json({ statusCode: 200, message: 'Offer added successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).put((req, res) => {
        const offer_id = req.body.id;
        Colls_Offer.updateOne({ _id: new ObjectId(offer_id) }).then(() => {
            res.json({ statusCode: 200, message: 'Offer updated successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });

    }).delete((req, res) => {
        Colls_Offer.deleteOne({ _id: req.body.id }).then(() => {
            res.json({ statusCode: 200, message: 'Offer deleted successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    })

module.exports = offer;