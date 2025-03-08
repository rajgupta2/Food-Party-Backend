const express = require('express');
const ObjectId = require("mongodb").ObjectId;
const { Colls_MenuItems,Colls_User,Colls_Restaurant } = require('../Models/DB');

const menuItems = express();

menuItems.get('/all', (req, res) => {
    Colls_MenuItems.find().populate('_Restaurant','Name').then((data) => {
        res.json({ statusCode: 200, menuItems: data });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})
menuItems.get('/', async (req, res) => {
    const user=await Colls_User.findOne({ Email: req.headers.email });
    const Res_id = await Colls_Restaurant.findOne({ _UserId:user._id });
    Colls_MenuItems.find({ _Restaurant:Res_id._id }).then((data) => {
        res.json({ statusCode: 200, menuItems: data });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})
menuItems.get('/:resid', async (req, res) => {
    Colls_MenuItems.find({ _Restaurant:req.params.resid}).then((data) => {
        res.json({ statusCode: 200, menuItems: data });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})
menuItems.post('/', async(req, res) => {
    const user=await Colls_User.findOne({ Email: req.body.RestaurantEmail });
    const Res_id = await Colls_Restaurant.findOne({ _UserId:user._id });
    const newmenuItems = new Colls_MenuItems({
        Name: req.body.Name,
        Description: req.body.Description,
        Price: req.body.Price,
        ImageUrl: req.body.ImageUrl,
        _Restaurant:Res_id._id
    });
    newmenuItems.save().then(() => {
        res.json({ statusCode: 200, message: 'Food item added successfully as menu-item.' });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})
menuItems.put('/:id', (req, res) => {
    Colls_MenuItems.updateOne({ _id: req.params.id },
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
})
menuItems.delete('/:id', (req, res) => {
    console.log(req.params);
    Colls_MenuItems.deleteOne({ _id: new ObjectId(req.params.id) }).then((data) => {
        console.log(data);
        res.json({ statusCode: 200, message: 'Food item removed successfully.' });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})

module.exports = menuItems;