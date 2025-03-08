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
    }).catch((err) => {
        console.log("Error connecting to mongodb" + err.message);
});

const Colls_Cart = mongoose.model("Colls_Cart", Cart_Schema);
const Colls_Favorite = mongoose.model("Colls_Favorite", Favorite_Schema);
const Colls_MenuItems = mongoose.model("Colls_MenuItems", MenuItem_Schema);
const Colls_Offer = mongoose.model("Colls_Offer", Offer_Schema);
const Colls_Orders = mongoose.model("Colls_Orders", Orders_Schema);
const Colls_Restaurant = mongoose.model("Colls_Restaurant", Restaurant_Schema);
const Colls_User_Address = mongoose.model('Colls_User_Addresses', Address_Schema);
const Colls_User = mongoose.model('Colls_User', User_Schema);
const Colls_UserDetails = mongoose.model('Colls_UserDetails', UserDetails_Schema);

const offers = [
    {
        Title: "Weekend Special - 20% Off",
        Description: "Enjoy 20% off on all orders above $20 this weekend!",
        Dis_Type: "Percentage",
        Discount: "20",
        Min_Order: "20",
        StartDate: "2025-03-15",
        EndDate: "2025-03-17",
        RestaurantName: "John's Burger House" // To link with a restaurant
    },
    {
        Title: "Buy 1 Get 1 Free - Pizza Fiesta",
        Description: "Buy one pizza and get another one absolutely free!",
        Dis_Type: "BOGO",
        Discount: "100",
        Min_Order: "15",
        StartDate: "2025-03-10",
        EndDate: "2025-03-20",
    },
    {
        Title: "Flat $5 Off on Orders Above $30",
        Description: "Get a flat $5 discount on orders over $30.",
        Dis_Type: "Flat",
        Discount: "5",
        Min_Order: "30",
        StartDate: "2025-03-12",
        EndDate: "2025-03-22",
    },
    {
        Title: "Free Dessert with Any Main Course",
        Description: "Get a complimentary dessert with every main course meal.",
        Dis_Type: "Free Item",
        Discount: "100",
        Min_Order: "10",
        StartDate: "2025-03-08",
        EndDate: "2025-03-18",
    }
];



 const get=async ()=>{
     for (let restaurant of offers) {
         const r=await Colls_User.findOne({ Email: "restaurant@gmail.com" })
         const user = await Colls_Restaurant.findOne({ _UserId:r._id });
         if (user) {
             const res=new Colls_Offer({
                     ...restaurant,
                     _Restaurant: user._id //Res_id
             })
             res.save().then(()=>{
                 console.log(`Restaurant ${restaurant.Title} added successfully!`);
             })
         } else {
             console.log(`User with email ${restaurant} not found!`);
         }
     }

 }
//get();
module.exports = {
     Colls_Cart ,
     Colls_Favorite,
     Colls_MenuItems,
     Colls_Offer,
     Colls_Orders,
     Colls_Restaurant,
     Colls_User_Address,
     Colls_User,
     Colls_UserDetails
}