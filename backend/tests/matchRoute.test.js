// const request = require('supertest');
// const app = require('../server.js');

// describe('GET /api/matches/test-matches', () => {
//   it('should return matched events for each volunteer', async () => {
//     const res = await request(app).get('/api/matches/test-matches');

//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);

//     //check structure of one result
//     const volunteerMatch = res.body.find(v => v.volunteer.includes("Volunteer A"));
//     expect(volunteerMatch).toHaveProperty('matches');
//     expect(Array.isArray(volunteerMatch.matches)).toBe(true);
//   });
// });

const request = require('supertest');
const express = require('express');

//Mock the controller functions
jest.mock('../controllers/matchController', () => ({
  getMatchesForUser: jest.fn((req, res) => res.status(200).json({ message: 'matched events' })),
  updateEventStatus: jest.fn((req, res) => res.status(200).json({ message: 'status updated' })),
  getAllUsers: jest.fn((req, res) => res.status(200).json({ message: 'all users' }))
}));

const { getMatchesForUser, updateEventStatus, getAllUsers } = require('../controllers/matchController');
const matchRoutes = require('../routes/matchRoute');

const app = express();
app.use(express.json()); //Needed for PATCH body parsing
app.use('/', matchRoutes);

describe('Match Routes', () => {
  test('GET /users/:userId/matched-events calls getMatchesForUser', async () => {
    const res = await request(app).get('/users/userId/matched-events');
    
    expect(getMatchesForUser).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'matched events' });
  });

  test('PATCH /:eventId/status calls updateEventStatus', async () => {
    const res = await request(app)
      .patch('/users/1/events/123/status')
      .send({ status: 'Attended' });

    expect(updateEventStatus).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'status updated' });
  });

  test('GET /users', async () => {
    const res = await request(app).get('/users');
    
    expect(getAllUsers).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'all users' });
  });
});

