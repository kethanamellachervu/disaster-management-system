const Incident = require('../models/Incident');

const getIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find({});
        res.json(incidents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createIncident = async (req, res) => {
    try {
        const { name, location, severity, description } = req.body;
        const incident = await Incident.create({
            name,
            location,
            severity,
            description,
            status: 'Active'
        });
        res.status(201).json(incident);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getIncidents,
    createIncident
};
