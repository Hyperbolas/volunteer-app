const db = require('../database/db');

// GET /api/volunteer-history
exports.getAllVolunteerHistories = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        vh.eventname,
        vh.requiredskills,
        vh.date,
        vh.status,
        up.full_name AS volunteername
      FROM VolunteerHistory vh
      JOIN UserProfile up ON vh.volunteer_id = up.id
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching volunteer history:", err);
    res.status(500).json({ error: "Server error" });
  }
};
