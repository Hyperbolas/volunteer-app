const db = require('../database/db');
const { createObjectCsvStringifier } = require('csv-writer');

// GET /api/volunteer-history
exports.getAllVolunteerHistories = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        ed.eventname,
        ed.skills AS requiredskills,
        ed.date[1] AS date,
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

exports.exportVolunteerHistoryCsv = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        ed.eventname,
        ed.skills AS requiredskills,
        ed.date[1] AS date,
        ue.status,
        up.full_name AS volunteername
      FROM UserEvents ue
      JOIN UserProfile up ON ue.user_id = up.user_id
      JOIN EventDetails ed ON ue.event_id = ed.id
    `);

    const rows = result.rows.map(r => ({
      volunteername: r.volunteername || '',
      eventname: r.eventname || '',
      requiredskills: Array.isArray(r.requiredskills) ? r.requiredskills.join(', ') : (r.requiredskills || ''),
      date: r.date ? new Date(r.date).toISOString().slice(0,10) : '',
      status: r.status || ''
    }));

    const csv = createObjectCsvStringifier({
      header: [
        { id: 'volunteername',  title: 'Volunteer' },
        { id: 'eventname',      title: 'Event' },
        { id: 'requiredskills', title: 'Required Skills' },
        { id: 'date',           title: 'Date' },
        { id: 'status',         title: 'Status' },
      ],
    });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="volunteer-participation-history.csv"');
    res.status(200).send(csv.getHeaderString() + csv.stringifyRecords(rows));
  } catch (err) {
    console.error('CSV export failed:', err);
    res.status(500).json({ error: 'CSV export failed' });
  }
};