const express = require('express');
const router = express.Router();
const { getIncidents, createIncident } = require('../controllers/incidentController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', protect, getIncidents);
router.post('/', protect, restrictTo('admin'), createIncident);

module.exports = router;
