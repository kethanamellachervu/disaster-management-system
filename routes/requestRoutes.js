const express = require('express');
const router = express.Router();
const { getRequests, getRequestsBySurvivorId, createRequest, updateRequestStatus } = require('../controllers/requestController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.get('/', protect, restrictTo('admin', 'volunteer'), getRequests);
router.get('/survivor/:survivorId', protect, getRequestsBySurvivorId);
router.post('/', protect, restrictTo('survivor'), createRequest);
router.put('/:id/status', protect, restrictTo('admin', 'volunteer'), updateRequestStatus);

module.exports = router;
