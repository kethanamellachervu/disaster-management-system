const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'volunteer', 'survivor'], required: true },
    name: { type: String, required: true },
    
    // Survivor specific fields
    age: { type: Number },
    phone: { type: String },
    location: { type: String },
    needs: [{ type: String }],
    uniqueCode: { type: String, sparse: true },
    
    // Volunteer specific fields
    skills: [{ type: String }],
    
    // Shared fields
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident' },
    status: { type: String },
    
    details: { type: Object, default: {} }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
