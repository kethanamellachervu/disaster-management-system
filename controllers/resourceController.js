const Resource = require('../models/Resource');

const getResources = async (req, res) => {
    try {
        const resources = await Resource.find({});
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addResource = async (req, res) => {
    try {
        const { type, totalQty, unit, incidentId } = req.body;
        
        let resource = await Resource.findOne({ type, incidentId });
        if (resource) {
            resource.totalQty += parseInt(totalQty);
            resource.availableQty += parseInt(totalQty); // Increase available by the added amount
            await resource.save();
        } else {
            resource = await Resource.create({
                type,
                totalQty: parseInt(totalQty),
                availableQty: parseInt(totalQty), // availableQty = totalQty initially
                unit,
                incidentId
            });
        }
        res.status(201).json(resource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const allocateResource = async (req, res) => {
    try {
        const { type, quantity } = req.body;
        
        const resource = await Resource.findOne({ type });
        if (!resource || resource.availableQty < quantity) {
            return res.status(400).json({ message: `Not enough ${type} available.` });
        }
        
        resource.availableQty -= parseInt(quantity);
        await resource.save();
        res.json(resource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getResources,
    addResource,
    allocateResource
};
