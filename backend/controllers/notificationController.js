const db = require('../database/db'); // To interact with DB

// Send a notification to a user (DB-backed)
async function sendNotification(req, res) {
  const { userEmail, message } = req.body;

  if (!userEmail || !message) {
    return res
      .status(400)
      .json({ error: "User email and message are required" });
  }

  try {
    // Look up the user ID from email
    const userResult = await db.query(
      "SELECT id FROM UserCredentials WHERE LOWER(email) = LOWER($1)",
      [userEmail]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userResult.rows[0].id;

    // Insert the notification into the database
    await db.query(
      "INSERT INTO Notifications (user_id, message) VALUES ($1, $2)",
      [userId, message]
    );

    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
}


// Get notifications from the database
// Get notifications from the database
async function getNotifications(req, res) {
  const { email } = req.query;

  if (!email) {
    return res
      .status(400)
      .json({ error: "Email is required to fetch notifications" });
  }

  try {
    // Query the database for notifications for the specific user
    const result = await db.query(
      "SELECT * FROM Notifications WHERE user_id = (SELECT id FROM UserCredentials WHERE LOWER(email) = LOWER($1))",
      [email]
    );

    const userNotifications = result.rows;

    if (userNotifications.length === 0) {
      return res.status(404).json({ error: "No notifications found" });
    }

    res.status(200).json(userNotifications); // Send back the notifications
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
}


// Send assignment notification - modified to store into DB
async function sendAssignmentNotification(req, res) {
  const { userEmail, eventName } = req.body;

  if (!userEmail || !eventName) {
    return res.status(400).json({ error: "User email and event name are required" });
  }

  try {
    // Find the user ID using the email
    const userResult = await db.query(
      "SELECT id FROM UserCredentials WHERE email = $1",
      [userEmail]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userResult.rows[0].id;

    // Insert the notification into the database
    const result = await db.query(
      "INSERT INTO Notifications (user_id, message) VALUES ($1, $2) RETURNING *",
      [userId, `You’ve been assigned to the event: ${eventName}`]
    );

    res.status(200).json({
      message: "Assignment notification sent",
      notification: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to send assignment notification" });
  }
}


function sendUpdateNotification(req, res) {
  res.status(200).json({ message: "Update notification sent" });
}

function sendReminderNotification(req, res) {
  res.status(200).json({ message: "Reminder notification sent" });
}

module.exports = {
  sendNotification,
  getNotifications,
  sendAssignmentNotification,
  sendUpdateNotification,
  sendReminderNotification,
};
