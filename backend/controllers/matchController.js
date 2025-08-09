const db = require('../database/db');

function normalizeInput(input) {
  if (Array.isArray(input)) return input;
  if (typeof input === 'string') return input.split(',');
  return [];
}

function normalizeDate(d) {
  try {
    return new Date(d).toISOString().slice(0, 10); // => "YYYY-MM-DD"
  } catch {
    return null;
  }
}

function matchUserToEvents(volunteer, event) {
  const volunteerDates = (volunteer.availability || []).map(normalizeDate);
  const volunteerSkills = normalizeInput(volunteer.skills);
  const eventDates = normalizeInput(event.date).map(normalizeDate);
  const eventSkills = normalizeInput(event.skills);

  const dateMatch = eventDates.some(d => volunteerDates.includes(d));
  const skillMatch = eventSkills.some(skill => volunteerSkills.includes(skill));
  const fullLocation = `${volunteer.city}, ${volunteer.state}`;
  const locationMatch = event.location === fullLocation;

  // console.log({
  //   volunteerId: volunteer.user_id,
  //   eventId: event.id,
  //   volunteerDates,
  //   eventDates,
  //   dateMatch,
  //   volunteerSkills,
  //   eventSkills,
  //   skillMatch,
  //   fullLocation,
  //   eventLocation: event.location,
  //   locationMatch
  // });


  return dateMatch && skillMatch && locationMatch;
};

async function getMatchesForUser(req, res) {
  const userId = req.params.userId;

  try {
    const { rows: volunteers } = await db.query(
      'SELECT * FROM userprofile WHERE user_id = $1',
      [userId]
    );
    const { rows: events } = await db.query('SELECT * FROM eventdetails');

    const volunteer = volunteers[0];
    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }

    const matchedEvents = [];

    for (const event of events) {
      if (matchUserToEvents(volunteer, event)) {
        console.log(`Matched: user ${userId} with event ${event.id}`);

        //insert into UserEvents if not already there
        await db.query(
          `INSERT INTO userevents (user_id, event_id, status)
           VALUES ($1, $2, $3)
          ON CONFLICT (user_id, event_id) DO NOTHING`,
          [userId, event.id, 'Select']
        );
            // Get status from UserEvents table
        const { rows: statusRows } = await db.query(
          `SELECT status FROM userevents WHERE user_id = $1 AND event_id = $2`,
          [userId, event.id]
        );

        const status = statusRows[0]?.status || 'Select';

        // Include status in the event object
        matchedEvents.push({
          ...event,
          userStatus: status, // match casing with frontend
        });
      }
    }


    res.json([{ volunteer: volunteer.full_name, matches: matchedEvents }]);
      // console.log("User ID", userId);
      // console.log("Matched events for user ID", userId, matchedEvents);
  } catch (err) {
    console.error('Error matching user to events:', err); 
    res.status(500).json({ error: 'Server error while matching user' });
  }
  };

async function updateEventStatus(req, res) {
  const { userId, eventId } = req.params;
  const { status } = req.body;

  console.log(`Updating status for user ${userId}, event ${eventId} to '${status}'`);


  try {
    await db.query(
      'UPDATE userevents SET status = $1 WHERE user_id = $2 AND event_id = $3',
      [status, userId, eventId]
    );
    res.json({ message: 'Status updated successfully' });
  } catch (err) {
    console.error('Error updating event status:', err);
    res.status(500).json({ error: 'Server error while updating status' });
  }
}

async function getAllUsers(req, res) {
  try {
    const result = await db.query(`
      SELECT user_id, full_name, skills 
      FROM userprofile
    `);
    res.json(result.rows);
    console.log("users:", {result})
  } catch (err) {
    console.error("Error fetching volunteers:", err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { 
  matchUserToEvents,
  getMatchesForUser,
  updateEventStatus,
  getAllUsers,
  normalizeInput,
  normalizeDate
};