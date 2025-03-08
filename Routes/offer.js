const express = require('express');
const ObjectId = require("mongodb").ObjectId;
const { Colls_Offer, Colls_User,Colls_Restaurant } = require('../Models/DB');

const offer = express();

offer.get("/all", async (req, res) => {
    Colls_Offer.find().populate('_Restaurant','Name').then((data) => {
        res.json({ statusCode: 200, offer: data });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})
offer.get("/:Email", async (req, res) => {
    const user = await Colls_User.findOne({ Email: req.params.Email });
    const Res_id = await Colls_Restaurant.findOne({ _UserId: user._id });
    Colls_Offer.find({ _Restaurant: Res_id._id }).then((data) => {
        res.json({ statusCode: 200, offer: data });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})
offer.post("/", async (req, res) => {
    const user = await Colls_User.findOne({ Email: req.body.Email });
    const Res_id = await Colls_Restaurant.findOne({ _UserId: user._id });
    const newoffer = new Colls_Offer({
        Title: req.body.Title,
        Description: req.body.Description,
        Dis_Type: req.body.Dis_Type,
        Discount: req.body.Discount,
        Min_Order: req.body.Min_Order,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        _Restaurant: Res_id._id
    });
    newoffer.save().then(() => {
        res.json({ statusCode: 200, message: 'Offer added successfully.' });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})
offer.delete("/:id", (req, res) => {
    Colls_Offer.deleteOne({ _id: req.params.id }).then(() => {
        res.json({ statusCode: 200, message: 'Offer deleted successfully.' });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})

module.exports = offer;