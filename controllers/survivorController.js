const User = require('../models/User');

const getSurvivors = async (req, res) => {
    try {
        const survivors = await User.find({ role: 'survivor' }).select('-password');
        res.json(survivors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVolunteers = async (req, res) => {
    try {
        const volunteers = await User.find({ role: 'volunteer' }).select('-password');
        res.json(volunteers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSurvivors,
    getVolunteers
};
