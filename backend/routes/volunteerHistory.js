const express = require("express");
const router = express.Router();

const {
  getAllVolunteerHistories,  // admin view
} = require("../controllers/volunteerHistoryController");

router.get("/", getAllVolunteerHistories);  

module.exports = router;
