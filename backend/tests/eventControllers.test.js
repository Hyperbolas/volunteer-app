require('../controllers/eventController');

const request = require('supertest');
const app = require('../server'); 
const db = require('../database/db'); 

describe('Event Controller', () => {
  afterAll(async () => {
    await db.end(); //close DB connection
  });

  test('GET /api/eventRoute should return array of events', async () => {
    const res = await request(app).get('/api/eventRoute');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/eventRoute should create a new event', async () => {
    const eventData = {
      eventname: 'Test Event',
      description: 'This is a test event',
      location: 'Test Location',
      skills: ['Communication'],
      urgency: 'Low',
      date: ['2025-08-03'],
      status: 'Pending'
    };

    const res = await request(app)
      .post('/api/eventRoute')
      .send(eventData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.eventname).toBe('Test Event');
  });

  test('PATCH /api/eventRoute/:id/status should update status', async () => {
    //create an event to update
    const event = await request(app).post('/api/eventRoute').send({
      eventname: 'Patch Test Event',
      description: 'For patch testing',
      location: 'Patch Location',
      skills: ['Event Planning'],
      urgency: 'High',
      date: ['2025-08-05']
    });

    const eventId = event.body.id;

    const res = await request(app)
      .patch(`/api/eventRoute/1/status`)
      .send({ status: 'Completed' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Completed');
  });
});
