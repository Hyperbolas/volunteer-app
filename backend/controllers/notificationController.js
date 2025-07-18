const notifications = [];
//references chatgpt, https://www.youtube.com/watch?v=UuhnalzKwE0
// Send a notification to a user
function sendNotification(req, res) {
  const { userEmail, message } = req.body;

  if (!userEmail || !message) {
    return res.status(400).json({ error: 'User email and message are required' });
  }

  // Add the notification to the list
  notifications.push({ userEmail, message });

  res.status(200).json({ message: 'Notification sent successfully' });
}

function getNotifications(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required to fetch notifications' });
  }

  const userNotifications = notifications.filter(n => n.userEmail === email);

  res.status(200).json(userNotifications);
}

function sendAssignmentNotification(req, res) {
  res.status(200).json({ message: "Assignment notification sent" });
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
  sendReminderNotification
};
