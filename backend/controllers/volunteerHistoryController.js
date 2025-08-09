const db = require('../database/db');

// GET /api/volunteer-history
exports.getAllVolunteerHistories = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        ed.eventname,
        ed.skills AS requiredskills,
        ed.date,
        ue.status,
        up.full_name AS volunteername
      FROM UserEvents ue
      JOIN UserProfile up ON ue.user_id = up.user_id
      JOIN EventDetails ed ON ue.event_id = ed.id
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching volunteer history:", err);
    res.status(500).json({ error: "Server error" });
  }
};
