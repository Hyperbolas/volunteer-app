const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get("/test-matches", matchController.getMatchesForAll);

module.exports = router;
