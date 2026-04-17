const Shelter = require('../models/Shelter');

const getShelters = async (req, res) => {
    try {
        const shelters = await Shelter.find({});
        res.json(shelters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createShelter = async (req, res) => {
    try {
        const { name, location, capacity, incidentId } = req.body;
        const shelter = await Shelter.create({
            name,
            location,
            capacity: parseInt(capacity),
            incidentId
        });
        res.status(201).json(shelter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const assignSurvivor = async (req, res) => {
    try {
        const shelter = await Shelter.findById(req.params.id);
        if (shelter && shelter.occupiedBeds < shelter.capacity) {
            shelter.occupiedBeds += 1;
            await shelter.save();
            res.json(shelter);
        } else {
             res.status(400).json({ message: 'Shelter is full or not found' });
        }
    } catch (error) {
         res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getShelters,
    createShelter,
    assignSurvivor
};
