const express = require('express');
const router = express.Router();

const {
  getEvents,
  createEvent,
  updateEventStatus
} = require('../controllers/eventController');

router.get('/', getEvents);
router.post('/', createEvent);
router.patch('/:id/status', updateEventStatus);

module.exports = router;