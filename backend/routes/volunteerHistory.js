const express = require("express");
const router = express.Router(); // ✅ Declare router first

const { getVolunteerHistory } = require("../controllers/volunteerHistoryController");
router.get("/history/:userId", getVolunteerHistory);

module.exports = router;
