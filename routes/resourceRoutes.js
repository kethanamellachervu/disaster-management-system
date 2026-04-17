const express = require('express');
const router = express.Router();
const { getResources, addResource, allocateResource } = require('../controllers/resourceController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', protect, getResources);
router.post('/', protect, restrictTo('admin'), addResource);
router.put('/allocate', protect, restrictTo('admin', 'volunteer'), allocateResource);

module.exports = router;
