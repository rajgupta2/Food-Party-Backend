require('dotenv').config();
const express=require('express');
const cors = require('cors');
const api=require('./api.js');

const app= express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api',api);

app.get("/",(req,res)=>{
    console.log("Hi there!");
    res.json({success:true});
})


app.listen(process.env.PORT || 5000, () => console.log("server is running"));