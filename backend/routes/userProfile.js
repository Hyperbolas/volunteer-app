const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userProfileController");
const dataStore = require("../storage/dataStore");

// get
router.get("/profile/:id", (req, res) =>
  ctrl.getUserProfile(req, res, dataStore)
);

// post
router.post("/profile/:id", (req, res) =>
  ctrl.updateUserProfile(req, res, dataStore)
);

module.exports = router;
