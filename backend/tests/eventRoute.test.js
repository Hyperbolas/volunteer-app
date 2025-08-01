jest.mock('../database/db', () => ({
  query: jest.fn(),
}));

const db = require('../database/db');
const request = require('supertest');
const app = require('../server');

describe('Event Routes', () => {

  beforeEach(() => {
    db.query.mockReset();
  });

  describe('GET /api/eventRoute', () => {
    it('should return a list of events', async () => {
      db.query.mockResolvedValue({
        rows: [
          { id: 1, eventName: 'Event 1', description: 'Desc 1', location: 'Loc 1', skills: ['Skill1'], urgency: 'High', date: '2025-08-01' },
          { id: 2, eventName: 'Event 2', description: 'Desc 2', location: 'Loc 2', skills: ['Skill2'], urgency: 'Low', date: '2025-08-02' }
        ]
      });

      const res = await request(app).get('/api/eventRoute');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
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

      // Mock DB insert returning inserted row with id
      db.query.mockResolvedValue({
        rows: [{ id: 123, ...newEvent }]
      });

      const res = await request(app).post('/api/eventRoute').send(newEvent);

      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject(newEvent);
      expect(res.body).toHaveProperty('id');
    });
  });

  describe('GET /api/eventRoute/participation', () => {
    it('should return participation history', async () => {
      db.query.mockResolvedValue({
        rows: [
          { volunteerName: 'John Doe', eventName: 'Event 1', participationDate: '2025-07-01' }
        ]
      });

      const res = await request(app).get('/api/eventRoute/participation');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty('volunteerName');
    });
  });

});
