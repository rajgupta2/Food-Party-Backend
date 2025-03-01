const express=require('express');

const addressAPI=require('./address');
const cartAPI=require('./cart');
const favoriteAPI=require('./favorite');
const userAPI=require('./user');
const menuItemsAPI=require('./menuItems');
const offerAPI=require('./offer');
const orderAPI=require('./order');
const restaurantAPI=require('./restaurant');
const userDetailsAPI=require('./userDetails');

const api=express();
console.log("api");
api.use('/user',userAPI);
api.use('/userDetails',userDetailsAPI);
api.use('/restaurant',restaurantAPI);
api.use('/menuItems',menuItemsAPI);
api.use('/cart',cartAPI);
api.use('/address',addressAPI);
api.use('/order',orderAPI);
api.use('/offer',offerAPI);
api.use('/favorite',favoriteAPI);

module.exports = api;