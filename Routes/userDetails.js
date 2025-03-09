const express = require('express');
const { Colls_UserDetails, Colls_User } = require('../Models/DB');

const userDetails = express();

userDetails.route('/')
    .get(async(req, res) => {
        const user=await Colls_User.findOne({Email:req.headers.email});
        Colls_UserDetails.findOne({ _User: user._id}).then((us) => {
            if (us!==undefined || us!==null)
                res.json({ statusCode: 200, data: us });
            else {
                res.json({ statusCode: 404});
            }
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    }).post(async (req, res) => {
        res.set('Content-Type', 'application/json');
        const user=await Colls_User.findOne({Email:req.body.Email});
        const newuser = new Colls_UserDetails({
            _User: user._id,
            Name: req.body.Name,
            Phone: req.body.Phone
        });
        newuser.save().then(() => {
            res.json({ statusCode: 201, message: 'Your profile has been saved successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: 'The database already contain your profile.', ErrorMessage: err.message })
        });
    }).put(async (req, res) => {
        const user=await Colls_User.findOne({Email:req.body.Email});
        Colls_UserDetails.updateOne({_User:user._id},{
            Name: req.body.Name, Phone: req.body.Phone
        }).then(()=>{
            res.json({ statusCode: 200, message: 'Your profile has been updated successfully.' });
        }).catch((err)=>{
           res.json({ statusCode: 500, message: 'Something got worng.', ErrorMessage: err.message })
        })
    })
    .delete((req, res) => {
        Colls_UserDetails.deleteOne({ Email: req.headers.email }).then(() => {
            res.json({ statusCode: 200, message: 'Your Profile deleted successfully.' });
        }).catch((err) => {
            res.json({ statusCode: 500, message: err.message });
        });
    })

module.exports = userDetails;