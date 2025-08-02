const db = require('../database/db'); // Your DB client connection, adjust as needed

// Get all events
async function getEvents(req, res) {
  try {
    const result = await db.query('SELECT * FROM events');
    console.log(result.rows); // you can remove this console.log later
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Create new event with validation
async function createEvent(req, res) {
  const { eventName, description, location, skills, urgency, date } = req.body;

  // Check if all required fields are present
  if (!eventName || !description || !location || !skills || !urgency || !date) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Assuming skills is an array, store as JSON string or adapt as needed
    const result = await db.query(
      'INSERT INTO events (eventName, description, location, skills, urgency, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [eventName, description, location, JSON.stringify(skills), urgency, date]
    );

    // Check if result and rows exist before accessing
    if (!result || !result.rows || result.rows.length === 0) {
      throw new Error('Failed to create event');
    }

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating events:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Participation history (example implementation)
async function getParticipationHistory(req, res) {
  try {
    const result = await db.query('SELECT * FROM participation_history'); // adjust table/columns
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching participation history:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Make sure to export all controller functions
module.exports = {
  getEvents,
  createEvent,
  getParticipationHistory,
};