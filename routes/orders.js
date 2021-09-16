const express = require('express');
const router = express.Router();
const OrdersSchema = require('../models/order');
const Joi = require('joi');
const mongoose = require('mongoose');
const { DB_CONN } = process.env;

mongoose.connect(DB_CONN);

const validateOrder = (req, res, next) => {
    const orderSchema = Joi.array().items(
        Joi.object().keys({
            name: Joi.string().required(),
            price: Joi.string().required()
        }));
    const validation = orderSchema.validate(req.body.order);
    const { error } = validation
    if (error) {
        console.log(`Failed to validate order, error - ${error.message}`);
        res.status(400).send(error);
        return;
    }
    next();
}

router.get('/', async (req, res) => {
    try {
        console.log("Getting all orders from the last 24 hours.");
        const lastTwentyFourHours = 24 * 60 * 60 * 1000;
        const yesterday = new Date(new Date() - lastTwentyFourHours);
        const orders = await OrdersSchema.find({ createdAt: { $gte: yesterday } });
        console.log(`Got ${orders.length} orders.`);
        res.status(200).json(orders);
    } catch (err) {
        console.error(`Failed to get all orders, error - ${err.message}`);
        res.sendStatus(503);
    }
})

router.post('/', validateOrder, async (req, res) => {
    try {
        console.log("Creating a new order.");
        const { order } = req.body;
        const newOrder = new OrdersSchema({
            order,
            createdAt: new Date()
        });
        await newOrder.save();
        console.log("Successfully created new order.");
        res.sendStatus(201)
    } catch (err) {
        console.error(`Failed to create new order, error - ${err.message}`);
        res.sendStatus(503);
    }
})

module.exports = router;