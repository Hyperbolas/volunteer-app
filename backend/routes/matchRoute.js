const express = require('express');
const router = express.Router();
const { updateEventStatus, getMatchesForUser, getAllUsers, matchUserToEvents }  = require('../controllers/matchController');
const pool = require('../database/db');

router.get('/users/:userId/matched-events', getMatchesForUser);
router.patch('/users/:userId/events/:eventId/status', updateEventStatus);
router.get('/users', getAllUsers);
router.get('/users/:userId/matched-events', matchUserToEvents);

module.exports = router;

