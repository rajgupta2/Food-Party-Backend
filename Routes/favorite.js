const express = require('express');
const ObjectId = require("mongodb").ObjectId;
const { Colls_Favorite,Colls_MenuItems } = require('../Models/DB');

const favorite = express();

favorite.get('/:Email/all-description', (req, res) => {
    Colls_Favorite.find({ Email: req.params.Email }).populate(
        {
            path: '_MenuItem',
            select: 'Name Description Price ImageUrl _Restaurant',
            populate: {
                path: '_Restaurant',
                select: 'Name' // Assuming the restaurant schema has a "Name" field
            }
        }).then((data) => {
        res.json({ statusCode: 200, favorites: data });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})

favorite.get('/:Email', (req, res) => {
    Colls_Favorite.find({ Email: req.params.Email }).then((data) => {
        res.json({ statusCode: 200, favorites: data });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})
favorite.post("/", async(req, res) => {
    const MenuItem = await Colls_MenuItems.findOne({ _id:req.body.Item_id });
    const newfavorite = new Colls_Favorite({
        Email: req.body.Email,
        _MenuItem: MenuItem._id
    });
    newfavorite.save().then(() => {
        res.json({ statusCode: 200, message: 'Food item added successfully as favorite.' });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})
favorite.delete('/:Email/:id', (req, res) => {
    Colls_Favorite.deleteOne({ Item_id:req.params.id,Email:req.params.Email }).then(() => {
        res.json({ statusCode: 200, message: 'Food item removed successfully as un-favorite.' });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})

module.exports = favorite;