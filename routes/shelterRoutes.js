const express = require('express');
const router = express.Router();
const { getShelters, createShelter, assignSurvivor } = require('../controllers/shelterController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', protect, getShelters);
router.post('/', protect, restrictTo('admin'), createShelter);
router.put('/:id/assign', protect, restrictTo('admin', 'volunteer'), assignSurvivor);

module.exports = router;
