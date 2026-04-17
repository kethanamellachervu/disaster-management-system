const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    occupiedBeds: { type: Number, default: 0 },
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Shelter', shelterSchema);
