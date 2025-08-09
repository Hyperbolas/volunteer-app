const express = require("express");
const router = express.Router();

const {
  getAllVolunteerHistories,
  exportVolunteerHistoryCsv,
} = require("../controllers/volunteerHistoryController");

router.get("/", getAllVolunteerHistories);  
router.get("/export.csv", exportVolunteerHistoryCsv);

module.exports = router;
