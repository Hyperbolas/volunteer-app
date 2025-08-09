// <<<<<<< HEAD
// const {
//   getEvents,
//   createEvent,
//   getParticipationHistory
// } = require('../controllers/eventController');

// // Create mock req/res objects for testing
// const mockResponse = () => {
//   const res = {};
//   res.status = jest.fn().mockReturnValue(res); // allow chaining
//   res.json = jest.fn();
//   return res;
// };

// describe('Event Controller Tests', () => {
//   describe('getEvents', () => {
//     it('should return all events', () => {
//       const req = {};
//       const res = mockResponse();

//       getEvents(req, res);

//       expect(res.json).toHaveBeenCalled();
//       const result = res.json.mock.calls[0][0];
//       expect(Array.isArray(result)).toBe(true);
//       expect(result.length).toBeGreaterThan(0);
//     });
//   });

//   describe('createEvent', () => {
//     it('should return 400 if fields are missing', () => {
//       const req = {
//         body: {
//           eventName: 'New Event',
//           // Missing fields
//         }
//       };
//       const res = mockResponse();

//       createEvent(req, res);

//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.json).toHaveBeenCalledWith({ error: 'All fields are required.' });
//     });

//     it('should create a new event if all fields are provided', () => {
//       const req = {
//         body: {
//           eventName: 'Volunteer Fair',
//           description: 'Local fair for volunteers',
//           location: 'City Hall',
//           skills: ['Coordination'],
//           urgency: 'Medium',
//           date: '2025-08-10'
//         }
//       };
//       const res = mockResponse();

//       createEvent(req, res);

//       expect(res.status).toHaveBeenCalledWith(201);
//       const createdEvent = res.json.mock.calls[0][0];
//       expect(createdEvent).toMatchObject(req.body);
//       expect(createdEvent).toHaveProperty('id');
//     });
//   });

//   describe('getParticipationHistory', () => {
//     it('should return all participation data', () => {
//       const req = {};
//       const res = mockResponse();

//       getParticipationHistory(req, res);

//       expect(res.json).toHaveBeenCalled();
//       const result = res.json.mock.calls[0][0];
//       expect(Array.isArray(result)).toBe(true);
//       expect(result[0]).toHaveProperty('volunteerName');
// =======
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
