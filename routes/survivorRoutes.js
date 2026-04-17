const express = require('express');
const router = express.Router();
const { getSurvivors, getVolunteers } = require('../controllers/survivorController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', protect, restrictTo('admin', 'volunteer'), getSurvivors);
router.get('/volunteers', protect, restrictTo('admin'), getVolunteers);

module.exports = router;
