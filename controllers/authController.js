const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

const registerUser = async (req, res) => {
    try {
        const { 
            username, password, role, name, 
            age, phone, location, needs, // Survivor specific
            skills, // Volunteer specific
            incidentId, status, details 
        } = req.body;
        
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate 6-digit unique alphanumeric code for offline tracking of survivors
        let uniqueCode = undefined;
        if (role === 'survivor') {
            uniqueCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        }
        
        const user = await User.create({
            username,
            password,
            role,
            name,
            age,
            phone,
            location,
            needs,
            skills,
            incidentId,
            status: status || (role === 'survivor' ? 'Pending' : 'Active'),
            uniqueCode,
            details
        });
        
        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                role: user.role,
                name: user.name,
                uniqueCode: user.uniqueCode,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                name: user.name,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        res.json({
            _id: req.user._id,
            username: req.user.username,
            role: req.user.role,
            name: req.user.name
        });
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};
