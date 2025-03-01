const express = require('express');
const ObjectId = require("mongodb").ObjectId;
const {Colls_Favorite} = require('../Models/DB');

const favorite = express();

favorite.route("/")
    .get((req, res) => {
        Colls_Favorite.find({ Email: req.body.Email }).then((data) => {
            res.json({ statusCode: 200, data: data });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).post((req, res) => {
        const newfavorite = new Colls_Favorite({
            Email: req.body.Email,
            Item_id: req.body.Item_id,
        });
        newfavorite.save().then(() => {
            res.json({ statusCode: 200, message: 'Food item added successfully as favorite.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).delete((req, res) => {
        Colls_Favorite.deleteOne({ _id: new ObjectId(req.body.id) }).then(() => {
            res.json({ statusCode: 200, message: 'Food item removed successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    })

module.exports = favorite;