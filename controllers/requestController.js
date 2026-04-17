const Request = require('../models/Request');
const Resource = require('../models/Resource');

const getRequests = async (req, res) => {
    try {
        const requests = await Request.find({}).populate('survivorId', 'name username details');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRequestsBySurvivorId = async (req, res) => {
    try {
        const requests = await Request.find({ survivorId: req.params.survivorId }).populate('survivorId', 'name');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createRequest = async (req, res) => {
    try {
        const { resourceType, quantity } = req.body;
        // req.user is set by authMiddleware
        const request = await Request.create({
            survivorId: req.user._id,
            resourceType: resourceType,
            quantity: quantity,
            status: 'Requested'
        });
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const request = await Request.findById(req.params.id);
        
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Transaction logic for "Delivered"
        if (status === 'Delivered' && request.status !== 'Delivered') {
            const resource = await Resource.findOne({ type: request.resourceType });
            
            if (!resource) {
                return res.status(404).json({ message: 'Resource not found' });
            }
            if (resource.availableQty < request.quantity) {
                return res.status(400).json({ message: `Insufficient resource quantity. Available: ${resource.availableQty}` });
            }
            
            // Atomically decrement
            await Resource.updateOne(
                { _id: resource._id },
                { $inc: { availableQty: -request.quantity } }
            );
        }
        
        request.status = status;
        await request.save();
        res.json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getRequests,
    getRequestsBySurvivorId,
    createRequest,
    updateRequestStatus
};
