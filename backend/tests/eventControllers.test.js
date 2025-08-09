require('../controllers/eventController');

const request = require('supertest');
const app = require('../server'); 
const db = require('../database/db');

jest.mock('../database/db');

describe('Event Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.end(); //close DB connection
  });

  test('GET /api/eventRoute should return array of events', async () => {
    const res = await request(app).get('/api/eventRoute');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /api/eventRoute/export.csv returns CSV download", async () => {
  const res = await request(app).get("/api/eventRoute/export.csv");

  expect(res.statusCode).toBe(200);
  expect(res.headers["content-type"]).toContain("text/csv");
  expect(res.headers["content-disposition"]).toContain("attachment");

  const firstLine = res.text.split("\n")[0].trim();
  expect(firstLine).toBe("Event Name,Description,Location,Skills,Urgency,Date,Status");
  });

  test('GET /api/eventRoute should handle DB errors', async () => {
    db.query.mockRejectedValueOnce(new Error('DB failure'));

    const res = await request(app).get('/api/eventRoute');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Server error');
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

  test('POST /api/eventRoute should return 400 if required fields are missing', async () => {
    const incompleteData = { eventname: 'Incomplete Event' };

    const res = await request(app)
      .post('/api/eventRoute')
      .send(incompleteData);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('All fields are required.');
  });

  test('POST /api/eventRoute should handle DB errors', async () => {
    db.query.mockRejectedValueOnce(new Error('DB failure'));

    const eventData = {
      eventname: 'Test Event',
      description: 'This is a test event',
      location: 'Test Location',
      skills: ['Communication'],
      urgency: 'Low',
      date: ['2025-08-03'],
    };

    const res = await request(app)
      .post('/api/eventRoute')
      .send(eventData);

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Server error');
  });

  test('PATCH /api/eventRoute/:id/status should update status', async () => {
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
      .patch(`/api/eventRoute/${eventId}/status`)
      .send({ status: 'Completed' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Completed');
  });

  test('PATCH /api/eventRoute/:id/status should handle DB errors', async () => {
    db.query.mockResolvedValueOnce({
      rows: [{ id: 123, eventname: 'Patch Test Event', status: 'Pending' }],
    });

    const createRes = await request(app)
      .post('/api/eventRoute')
      .send({
        eventname: 'Patch Test Event',
        description: 'For patch testing',
        location: 'Patch Location',
        skills: ['Event Planning'],
        urgency: 'High',
        date: ['2025-08-05'],
      });

    const eventId = createRes.body.id;

    db.query.mockRejectedValueOnce(new Error('DB failure'));

    const patchRes = await request(app)
      .patch(`/api/eventRoute/${eventId}/status`)
      .send({ status: 'Completed' });

    expect(patchRes.statusCode).toBe(500);
    expect(patchRes.body.error).toBe('Server error');
  });
});
