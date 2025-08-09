const request = require('supertest');
const app = require('../server'); //path to your express app
const eventController = require('../controllers/eventController');

// Mock the controller functions
jest.mock('../controllers/eventController');

describe('Event Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/eventRoute calls getEvents', async () => {
    eventController.getEvents.mockImplementation((req, res) =>
      res.status(200).json({ message: 'getEvents called' })
    );

    const res = await request(app).get('/api/eventRoute');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('getEvents called');
    expect(eventController.getEvents).toHaveBeenCalledTimes(1);
  });

  test('POST /api/eventRoute calls createEvent', async () => {
    eventController.createEvent.mockImplementation((req, res) =>
      res.status(201).json({ message: 'createEvent called' })
    );

    const res = await request(app).post('/api/eventRoute').send({ name: 'Test Event' });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('createEvent called');
    expect(eventController.createEvent).toHaveBeenCalledTimes(1);
  });

  test('PATCH /api/eventRoute/:id/status calls updateEventStatus', async () => {
    eventController.updateEventStatus.mockImplementation((req, res) =>
      res.status(200).json({ message: 'updateEventStatus called' })
    );

    const res = await request(app).patch('/api/eventRoute/123/status').send({ status: 'active' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('updateEventStatus called');
    expect(eventController.updateEventStatus).toHaveBeenCalledTimes(1);
  });
});
