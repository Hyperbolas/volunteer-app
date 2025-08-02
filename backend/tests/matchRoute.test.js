const request = require('supertest');
const app = require('../server.js');

describe('GET /api/matches/test-matches', () => {
  it('should return matched events for each volunteer', async () => {
    const res = await request(app).get('/api/matches/test-matches');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    //check structure of one result
    const volunteerMatch = res.body.find(v => v.volunteer.includes("Volunteer A"));
    expect(volunteerMatch).toHaveProperty('matches');
    expect(Array.isArray(volunteerMatch.matches)).toBe(true);
  });
});
