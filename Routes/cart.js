const express = require('express');
const ObjectId = require("mongodb").ObjectId;
const {Colls_Cart, Colls_MenuItems, Colls_User} = require('../Models/DB');

const cart = express();

cart.get("/:Email",async(req,res)=>{
    Colls_Cart.find({_User:req.params.Email}).then((data) => {
        res.json({ statusCode: 200, cart: data });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
});

cart.get("/:Email/all-description",async(req,res)=>{
    Colls_Cart.find({_User:req.params.Email}).populate({
            path: '_MenuItem',
            select: 'Name Description Price ImageUrl _Restaurant',
            populate: {
                path: '_Restaurant',
                select: 'Name' // Assuming the restaurant schema has a "Name" field
            }
        }).then((data) => {
        res.json({ statusCode: 200, cart: data });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
});

cart.route("/")
    .get((req, res) => {
        Colls_Cart.find({ Email: req.body.Email }).then((data) => {
            res.json({ statusCode: 200, data: data });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).post(async(req, res) => {
        const MenuItem=await Colls_MenuItems.findOne({_id:req.body.Item_id});
         const newCart = new Colls_Cart({
             _User: req.body.Email,
             _MenuItem: MenuItem._id,
         });
         newCart.save().then(() => {
             res.json({ statusCode: 200, message: 'Added to cart.' });
         }).catch((err) => {
             res.json({ statusCode: 500, message: err.message });
         });
    }).put((req, res) => {
        const cart_id = req.body.cartItemId;
        Colls_Cart.updateOne({ _id: cart_id }, { Quantity: req.body.quantity }).then(() => {
            res.json({ statusCode: 200, message: 'Food item updated successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });

    })
cart.delete("/:id",(req, res) => {
        Colls_Cart.deleteOne({ _id: req.params.id }).then(() => {
            res.json({ statusCode: 200, message: 'Food item deleted successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    })

module.exports = cart;