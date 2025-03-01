const Cart_Schema = require("./Cart_Schema");
const Favorite_Schema = require("./Favorite_Schema");
const User_Schema = require("./User_Schema");
const MenuItem_Schema = require("./MenuItem_Schema");
const Offer_Schema = require("./Offer_Schema");
const Orders_Schema = require("./Orders_Schema");
const Restaurant_Schema = require("./Restaurant_Schema");
const Address_Schema = require("./Address_Schema");
const UserDetails_Schema = require("./UserDetails_Schema");


const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const connectionurl=`mongodb+srv://${process.env.ATLAS_USER_NAME}:${process.env.ATLAS_PASSWORD}@foodpartymumbaicluster.myun1.mongodb.net/?retryWrites=true&w=majority&appName=foodPartyMumbaiCluster/foodparty`;
//const connectionurl = "mongodb://127.0.0.1:27017/foodparty";
mongoose.connect(connectionurl).then((status) => {
    console.log("mongodb connected successfully");
    console.log();
    }).catch((err) => {
        console.log("Error connecting to mongodb" + err.message);
});

const Colls_Cart = mongoose.model("Colls_Cart", Cart_Schema);
const Colls_Favorite = mongoose.model("Colls_Favorite", Favorite_Schema);
const Colls_MenuItem = mongoose.model("Colls_MenuItem", MenuItem_Schema);
const Colls_Offer = mongoose.model("Colls_Offer", Offer_Schema);
const Colls_Orders = mongoose.model("Colls_Orders", Orders_Schema);
const Colls_Restaurant = mongoose.model("Colls_Restaurant", Restaurant_Schema);
const Colls_User_Address = mongoose.model('Colls_User_Addresses', Address_Schema);
const Colls_User = mongoose.model('Colls_User', User_Schema);
const Colls_UserDetails = mongoose.model('Colls_UserDetails', UserDetails_Schema);


module.exports = {
     Colls_Cart ,
     Colls_Favorite,
     Colls_MenuItem,
     Colls_Offer,
     Colls_Orders,
     Colls_Restaurant,
     Colls_User_Address,
     Colls_User,
     Colls_UserDetails
}