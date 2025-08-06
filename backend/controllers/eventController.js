const express = require('express');
const router = express.Router();
const db = require('../database/db');

const getEvents = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM events');
    console.log(result.rows); // you can remove this console.log later
    res.json(result.rows);
  } catch (err){
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
    res.status(500).json({error: 'Server error' });

  }
};

const updateEventStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await db.query('SELECT * FROM participation_history'); // adjust table/columns
    res.json(result.rows);
  } catch (err) {
    console.error('Failed to update event status:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
  getEvents,
  createEvent,
  updateEventStatus
};