const User = require('../models/User');
const Resource = require('../models/Resource');
const Request = require('../models/Request');
const Shelter = require('../models/Shelter');

const getDashboardStats = async (req, res) => {
    try {
        const totalSurvivors = await User.countDocuments({ role: 'survivor' });
        const pendingRequests = await Request.countDocuments({ status: 'Requested' });
        
        const resources = await Resource.find({});
        let availableResources = 0;
        let criticalShortages = 0;
        resources.forEach(r => {
            availableResources += r.availableQty;
            if (r.availableQty === 0) {
                criticalShortages += 1;
            }
        });

        const shelters = await Shelter.find({});
        let shelterOccupancy = 0;
        let totalCapacity = 0;
        shelters.forEach(s => {
            shelterOccupancy += s.occupiedBeds;
            totalCapacity += s.capacity;
        });

        res.json({
            totalSurvivors,
            availableResources,
            pendingRequests,
            criticalShortages,
            shelterOccupancy: `${shelterOccupancy} / ${totalCapacity}`
        });
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboardStats
};
