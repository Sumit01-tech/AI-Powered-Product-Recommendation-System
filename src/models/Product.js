const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    brand: String,
    price: Number,
    rating: Number,
    stock: Number,
    views: { type: Number, default: 0 },
});

module.exports = mongoose.model('Product', productSchema);
