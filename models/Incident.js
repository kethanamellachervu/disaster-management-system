const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    severity: { type: String, enum: ['Low', 'Med', 'High'], required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Resolved'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('Incident', incidentSchema);
