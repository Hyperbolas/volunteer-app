const express = require("express");
const router = express.Router();

const { getVolunteerHistory } = require("../controllers/volunteerHistoryController");
router.get("/history/:userId", getVolunteerHistory);

module.exports = router;
