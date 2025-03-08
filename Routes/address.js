const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const {Colls_User_Address, Colls_User} = require('../Models/DB');

const address = express();

address.route("/")
    .get(async (req, res) => {
        const user=await Colls_User.findOne({Email:req.headers.email});
        Colls_User_Address.find({ _User:user._id }).then((data) => {
            res.json({ statusCode: 200, address: data });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).post(async(req, res) => {
        const user=await Colls_User.findOne({Email:req.body.Email});
        const newaddress = new Colls_User_Address({
            Name: req.body.name,
            Street: req.body.street,
            City: req.body.city,
            PinCode: req.body.pincode,
            _User:user._id
        });
        newaddress.save().then(() => {
            res.json({ statusCode: 200, message: 'Address added successfully.' });
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