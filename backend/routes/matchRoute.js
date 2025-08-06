const express = require('express');
const router = express.Router();
const { updateEventStatus, getMatchesForUser }  = require('../controllers/matchController');

router.get('/users/:userId/matched-events', getMatchesForUser);
// router.patch('/:userId/status', updateEventStatus);
router.patch('/users/:userId/events/:eventId/status', updateEventStatus);
module.exports = router;
