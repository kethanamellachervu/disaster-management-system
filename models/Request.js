const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    survivorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resourceType: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ['Requested', 'Delivered'], default: 'Requested' }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
