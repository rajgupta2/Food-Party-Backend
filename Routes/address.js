const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const {Colls_User_Address} = require('../Models/DB');

const address = express();

address.route("/")
    .get((req, res) => {
        Colls_User_Address.find({ Email: req.body.Email }).then((data) => {
            res.json({ statusCode: 200, data: data });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).post((req, res) => {
        const newaddress = new Colls_User_Address({
            Name: req.body.Name,
            Street: req.body.Street,
            City: req.body.City,
            PinCode: req.body.PinCode,
            Email: req.body.Email
        });
        newaddress.save().then(() => {
            res.json({ statusCode: 200, message: 'Address added successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).put((req, res) => {
        const address_id = req.body.id;
        Colls_User_Address.updateOne({ _id: new ObjectId(address_id) }, {
            Name: req.body.Name,
            Street: req.body.Street,
            City: req.body.City,
            PinCode: req.body.PinCode,
            Email: req.body.Email
        }).then(() => {
            res.json({ statusCode: 200, message: 'Address updated successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });

    }).delete((req, res) => {
        Colls_User_Address.deleteOne({ _id: req.body.id }).then(() => {
            res.json({ statusCode: 200, message: 'Address deleted successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    })

module.exports = address;