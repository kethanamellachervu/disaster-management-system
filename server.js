require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/incidents', require('./routes/incidentRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/survivors', require('./routes/survivorRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/shelters', require('./routes/shelterRoutes'));

// Database Connection
const User = require('./models/User');

const mongoUri = process.env.MONGO_URI;
if (!mongoUri || mongoUri === '<YOUR_MONGODB_ATLAS_CONNECTION_STRING>') {
    console.error('FATAL ERROR: Please update your .env file with a valid MongoDB Atlas connection string.');
    process.exit(1);
}

mongoose.connect(mongoUri).then(async () => {
    console.log('MongoDB connected successfully');
    
    // Seed admin if none exists
    try {
        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            // Do NOT manually hash — the User model's pre('save') hook handles it
            await User.create({
                username: 'admin',
                password: 'password',
                role: 'admin',
                name: 'Master Admin',
                details: { info: 'Default seeded admin' }
            });
            console.log('Default Admin seeded (username: admin, password: password)');
        }
    } catch (err) {
        console.error('Error seeding admin:', err);
    }
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Fallback for API routes to send 404
app.use('/api', (req, res) => {
    res.status(404).json({ message: 'API route not found' });
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
