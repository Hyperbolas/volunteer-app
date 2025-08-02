const express = require("express");
const router = express.Router();

const {
  sendAssignmentNotification,
  sendUpdateNotification,
  sendReminderNotification,
  sendNotification,
  getNotifications,
} = require("../controllers/notificationController");

router.post("/notify/assignment", sendAssignmentNotification);

router.post("/notify/update", sendUpdateNotification);

router.post("/notify/reminder", sendReminderNotification);

router.post("/notifications", sendNotification);
router.get("/notifications", getNotifications);

module.exports = router;
