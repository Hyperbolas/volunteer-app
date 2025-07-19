const express = require('express');
const router = express.Router();

const {
  getEvents,
  createEvent,
  getParticipationHistory
} = require('../controllers/eventController');

router.get('/', getEvents);
router.post('/', createEvent);
router.get('/participation', getParticipationHistory);

module.exports = router;



