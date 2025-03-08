const express = require('express');
const { Colls_Restaurant, Colls_User } = require('../Models/DB');

const restaurant = express();

restaurant.get("/all", (req, res) => {
    Colls_Restaurant.find().populate('_UserId','Email').then((data) => {
        res.json({ statusCode: 200, restaurants: data });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
});
restaurant.get("/:resid",(req,res)=>{
    Colls_Restaurant.findOne({_id:req.params.resid}).then((data) => {
        res.json({ statusCode: 200, restaurant: data });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
});
restaurant.get("/", async(req, res) => {
    const user = await Colls_User.findOne({ Email: req.headers.email });
    Colls_Restaurant.findOne({ _UserId:user._id }).then((data) => {
        if (data)
            return res.json({ statusCode: 200, data: data, isFound: true });
        res.json({ statusCode: 200, data: data, isFound: false });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
});
restaurant.post("/", async (req, res) => {
    const user = await Colls_User.findOne({ Email: req.body.Email });
    const newrestaurant = new Colls_Restaurant({
        Name: req.body.Name,
        Description: req.body.Description,
        Address: req.body.Address,
        Contact: req.body.Contact,
        OperatingHours: req.body.OperatingHours,
        Rating: req.body.Rating,
        CoverImage: req.body.CoverImage,
        _UserId: user._id
    });
    newrestaurant.save().then(() => {
        res.json({ statusCode: 200, message: 'Restaurant added successfully.' });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})
restaurant.put("/", async (req, res) => {
    Colls_Restaurant.updateOne({_UserId:req.body._UserId}, {
        Name: req.body.Name,
        Description: req.body.Description,
        Address: req.body.Address,
        Contact: req.body.Contact,
        OperatingHours: req.body.OperatingHours,
        Rating: req.body.Rating,
        CoverImage: req.body.CoverImage,
    }).then(() => {
        res.json({ statusCode: 200, message: 'Restaurant updated successfully.' });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})
restaurant.delete("/", async(req, res) => {
    const user = await Colls_User.findOne({ Email: req.body.Email });
    Colls_Restaurant.deleteOne({ _UserId: user._id }).then(() => {
        res.json({ statusCode: 200, message: 'Restaurant deleted successfully.' });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})

module.exports = restaurant;