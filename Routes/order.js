const express = require('express');
const ObjectId = require("mongodb").ObjectId;
const { Colls_Orders, Colls_User, Colls_Cart, Colls_Restaurant, Colls_UserDetails } = require('../Models/DB');

const order = express();

order.post('/place-order', async (req, res) => {
    const { customerEmail, deliveryAddress, paymentMethod, cartItems } = req.body;
    const customer = await Colls_User.findOne({ Email: customerEmail });
    const cusDetails = await Colls_UserDetails.findOne({ _User: customer._id });
    try {
        if (!customer._id || !deliveryAddress || !paymentMethod || cartItems.length === 0) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        //Group items by restaurant
        const orders = {};
        cartItems.forEach(item => {
            const restaurantId = item._MenuItem._Restaurant._id; //Assuming each menu item has a restaurant ID
            if (!orders[restaurantId]) {
                orders[restaurantId] = [];
            }
            orders[restaurantId].push({
                item: item._MenuItem._id,
                Quantity: item.Quantity
            });
        });
        //Create separate orders for each restaurant
        const orderResults = [];
        for (const restaurantId in orders) {
            const newOrder = new Colls_Orders({
                Customer: cusDetails._id,
                Restaurant: restaurantId,
                DeliveryAddress: deliveryAddress,
                paymentMethod: paymentMethod,
                Items: orders[restaurantId]
            });
            await newOrder.save();
            orderResults.push(newOrder);
        }
        await Colls_Cart.deleteMany({ _User: customerEmail });
        res.json({ message: 'Orders placed successfully', orders: orderResults });
    } catch (error) {
        console.error('Error placing order:', error);
        res.json({ error: 'Internal Server Error' });
    }
});
order.get('/:Email', async (req, res) => {
    const customer = await Colls_User.findOne({ Email: req.params.Email });
    const cusDetails = await Colls_UserDetails.findOne({ _User: customer._id });
    Colls_Orders.find({ Customer: cusDetails._id }).populate('Restaurant', 'Name Address Contact')
        .populate('DeliveryAddress', 'Name Street City PinCode ')
        .populate('Items.item', 'Name Description Price')
        .then((data) => {
            res.json({ statusCode: 200, orders: data });
        }).catch((err) => {
            res.json({ statusCode: 500, error: err });
            console.log(err);
        });
});
order.get('/active-order/:Email', async (req, res) => {
    const user = await Colls_User.findOne({ Email: req.params.Email });
    const restaurant = await Colls_Restaurant.findOne({ _UserId: user._id });
    Colls_Orders.find({ Restaurant: restaurant._id, Status: { $ne: 'Delivered' } })
        .populate('DeliveryAddress', 'Name Street City PinCode ')
        .populate('Items.item', 'Name Description Price')
        .populate('Customer', 'Name Phone')
        .then((data) => {
            res.json({ statusCode: 200, orders: data });
        }).catch((err) => {
            res.json({ statusCode: 500, error: err });
            console.log(err);
        });
});
order.get('/order-history/:Email', async (req, res) => {
    const user = await Colls_User.findOne({ Email: req.params.Email });
    const restaurant = await Colls_Restaurant.findOne({ _UserId: user._id });
    Colls_Orders.find({ Restaurant: restaurant._id })
        .populate('DeliveryAddress', 'Name Street City PinCode ')
        .populate('Items.item', 'Name Description Price')
        .populate('Customer', 'Name Phone')
        .then((data) => {
            res.json({ statusCode: 200, orders: data });
        }).catch((err) => {
            res.json({ statusCode: 500, error: err });
            console.log(err);
        });
});
order.get("/update-order/:id/:status", (req, res) => {
    Colls_Orders.updateOne({ _id: req.params.id}, {Status:req.params.status }).then(() => {
        res.json({ statusCode: 200, message: 'Order updated successfully.' });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });


});
order.delete("/:id", (req, res) => {
    Colls_Orders.deleteOne({ _id: req.params.id }).then(() => {
        res.json({ statusCode: 200, message: 'Ordered deleted successfully.' });
    }).catch((err) => {
        res.json({ statusCode: 500, message: err.message });
    });
})

module.exports = order;