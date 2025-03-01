const express = require('express');
const {Colls_Restaurant} = require('../Models/DB');

const restaurant = express();

restaurant.route('/')
    .get((req, res) => {
        Colls_Restaurant.findOne({Email:req.headers.Email}).then((data) => {
            if(data)
            return res.json({ statusCode: 200, data: data,isFound: true });
            res.json({ statusCode: 200, data: data,isFound: false });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).post((req, res) => {
        console.log(req.body);

        const newrestaurant = new Colls_Restaurant({
            Name: req.body.Name,
            Description: req.body.Description,
            Address: req.body.Address,
            Contact: req.body.Contact,
            OperatingHours: req.body.OperatingHours,
            Rating: req.body.Rating,
            CoverImage: req.body.CoverImage,
            Email: req.body.Email
        });
        newrestaurant.save().then(() => {
            res.json({ statusCode: 200, message: 'Restaurant added successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).put((req, res) => {
        Colls_Restaurant.updateOne({ Email: req.body.Email }, {
            Name: req.body.Name,
            Description: req.body.Description,
            Address: req.body.Address,
            Contact: req.body.Contact,
            OperatingHours: req.body.OperatingHours,
            Rating: req.body.Rating,
            CoverImage: req.body.CoverImage,
            Email: req.body.Email
        }).then(() => {
            res.json({ statusCode: 200, message: 'Restaurant updated successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).delete((req, res) => {
        Colls_Restaurant.deleteOne({ Email: req.body.Email }).then(() => {
            res.json({ statusCode: 200, message: 'Restaurant deleted successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    })

module.exports = restaurant;