const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userProfileController");

router.get("/profile/:userId", getUserProfile);
router.put("/profile/:userId", updateUserProfile);

module.exports = router;
