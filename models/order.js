const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    order: {type: Object, required: true},
    createdAt: Date
});

module.exports = mongoose.model('Order', orderSchema);