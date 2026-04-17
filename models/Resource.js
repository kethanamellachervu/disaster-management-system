const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., 'Food', 'Water', 'Medicine'
    totalQty: { type: Number, required: true, default: 0 },
    availableQty: { type: Number, required: true, default: 0 },
    unit: { type: String },
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true }
}, { timestamps: true });

// Ensure availableQty doesn't exceed totalQty
resourceSchema.pre('save', function(next) {
    if (this.availableQty > this.totalQty) {
        this.availableQty = this.totalQty;
    }
    next();
});

module.exports = mongoose.model('Resource', resourceSchema);
