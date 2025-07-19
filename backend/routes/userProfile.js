const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userProfileController");

router.get("/profile/:id", getUserProfile);
router.put("/profile/:id", updateUserProfile);

module.exports = router;
