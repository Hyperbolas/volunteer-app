const express = require('express');
const router = express.Router();

const {
  getEvents,
  createEvent,
  updateEventStatus,
  exportEventDetailsCsv
} = require('../controllers/eventController');

router.get('/', getEvents);
router.post('/', createEvent);
router.patch('/:id/status', updateEventStatus);
router.get("/export.csv", exportEventDetailsCsv);

module.exports = router;