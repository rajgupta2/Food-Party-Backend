const express = require('express');
const ObjectId = require("mongodb").ObjectId;
const { Colls_User } = require('../Models/DB');

const user = express();

user.get("/:Email", (req, res) => {
    const data=req.headers.data;
    Colls_User.findOne({ Email: req.params.Email, Password: data.Password, Type: data.Type }).then((user) => {
        if (user!==undefined || user!==null)
            res.json({ statusCode: 200, isValidate: true });
        else {
            res.json({ statusCode: 404, isValidate: false });
        }
    }).catch((err) => {
        res.json({ statusCode: 500, isValidate: false, message: err.message });
    });
})
user.post("/", (req, res) => {
    res.set('Content-Type', 'application/json');
    const newuser = new Colls_User({
        Email: req.body.Email,
        Password: req.body.Password,
        Type: req.body.Type
    });
    newuser.save().then(() => {
        res.json({ statusCode: 201, message: 'You have registered successfully.' });
    }).catch((err) => {
        res.json({ statusCode: 500, message: 'The Email is already registered or something gone wrong.', ErrorMessage: err.message })
    });
})
user.delete("/:Email", (req, res) => {
    Colls_User.deleteOne({ Email: req.params.Email }).then(() => {
        res.json({ statusCode: 200, message: 'Your Account deleted successfully.' });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})

module.exports = user;