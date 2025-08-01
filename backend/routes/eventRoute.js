const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
  getParticipationHistory,
} = require('../controllers/eventController');

// GET all events
router.get('/', getEvents);

// POST create new event
router.post('/', createEvent);

// GET participation history
router.get('/participation', getParticipationHistory);

module.exports = router;
