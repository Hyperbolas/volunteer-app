const express = require('express');
const router = express.Router();
const db = require('../database/db');

const getEvents = async (req, res) => {
  try {
    const result = await db.query('SELECT * from eventdetails');
    res.json(result.rows);
  } catch (err){
    console.error('Error fetching events:', err);
    res.status(500).json({error: 'Server error' });

  }
  };

const createEvent = async (req, res) => {
  const { eventname, description, location, skills, urgency, date } = req.body;

  //Check if all required fields are present
  if (!eventname || !description || !location || !skills || !urgency || !date) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const result = await db.query(
    `INSERT INTO eventdetails (eventname, description, location, skills, urgency, date)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [eventname, description, location, skills, urgency, date]);
    res.status(201).json(result.rows[0]
    );
  } catch (err){
    console.error('Error creating events:', err);
    res.status(500).json({error: 'Server error' });

  }
};

const updateEventStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await db.query(
      'UPDATE eventdetails SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(result.rows[0]);
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