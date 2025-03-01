const express = require('express');
const ObjectId = require("mongodb").ObjectId;
const {Colls_MenuItems} = require('../Models/DB');

const menuItems = express();

menuItems.route("/")
    .get((req, res) => {
        Colls_MenuItems.find({ RestaurantEmail: req.body.Email }).then((data) => {
            res.json({ statusCode: 200, data: data });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).post((req, res) => {
        const newmenuItems = new Colls_MenuItems({
            Name: req.body.Name,
            Description: req.body.Description,
            Price: req.body.Price,
            ImageUrl: req.body.ImageUrl,
            RestaurantEmail: req.body.RestaurantEmail
        });
        newmenuItems.save().then(() => {
            res.json({ statusCode: 200, message: 'Food item added successfully as menu-item.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).put((req, res) => {
        Colls_MenuItems.updateOne({ _id: req.body.id },
            {
                Name: req.body.Name,
                Description: req.body.Description,
                Price: req.body.Price,
                ImageUrl: req.body.ImageUrl,
                RestaurantEmail: req.body.RestaurantEmail
            }
        ).then(() => {
            res.json({ statusCode: 200, message: 'Food item updated successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).delete((req, res) => {
        Colls_MenuItems.deleteOne({ _id: new ObjectId(req.body.id) }).then(() => {
            res.json({ statusCode: 200, message: 'Food item removed successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    })

module.exports = menuItems;