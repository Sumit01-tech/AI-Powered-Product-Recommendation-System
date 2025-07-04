const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    type: { type: String, enum: ['view', 'purchase'], required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interaction', interactionSchema);
