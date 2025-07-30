const request = require('supertest');
const app = require('../server'); // Import the full app

describe('Event Routes', () => {
  describe('GET /api/eventRoute', () => {
    it('should return a list of events', async () => {
      const res = await request(app).get('/api/eventRoute');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/eventRoute', () => {
    it('should return 400 if missing fields', async () => {
      const res = await request(app).post('/api/eventRoute').send({ eventName: 'Missing Data' });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('All fields are required.');
    });

    it('should create a new event', async () => {
      const newEvent = {
        eventName: 'Test Event',
        description: 'Test event description',
        location: 'Test Location',
        skills: ['Testing'],
        urgency: 'Low',
        date: '2025-08-01',
      };
      const res = await request(app).post('/api/eventRoute').send(newEvent);
      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject(newEvent);
      expect(res.body).toHaveProperty('id');
    });
  });

  describe('GET /api/eventRoute/participation', () => {
    it('should return participation history', async () => {
      const res = await request(app).get('/api/eventRoute/participation');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty('volunteerName');
    });
  });
});
