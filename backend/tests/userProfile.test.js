const request = require('supertest');
const app     = require('../server');
const db      = require('../database/db');

beforeAll(async () => {
  // clear out
  await db.query(`DELETE FROM UserProfile`);
  
  // insert a profile for id=1 so GET and validation both hit the right branches
  await db.query(`
    INSERT INTO UserProfile (
      id, full_name, address, city, state, zipcode,
      skills, preferences, availability
    ) VALUES (
      1, 'Test User', '123 Main St', 'Houston', 'TX', '77001',
      ARRAY['cleaning'], 'None', ARRAY['2025-08-01'::timestamp]
    )
  `);
});

afterAll(async () => {
  await db.query(`DELETE FROM UserProfile`);
  await db.end();          // now works because you exported it above
});

describe('User Profile API', () => {
  it('should return 400 if required fields are missing', async () => {
    // send a PUT with an empty body against /api/profile/1
    const res = await request(app).put('/api/profile/1').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('should update or insert a valid profile', async () => {
    const newProfile = {
      fullName: 'Alice',
      address1: '456 Elm St',
      city: 'Austin',
      state: 'TX',
      zipCode: '73301',
      skills: ['cooking'],
      availability: ['2025-08-05']
    };

    const res = await request(app)
      .put('/api/profile/1')
      .send(newProfile);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Profile saved successfully');

    // now GET it back
    const getRes = await request(app).get('/api/profile/1');
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.fullName).toBe('Alice');
    expect(getRes.body.address1).toBe('456 Elm St');
  });
});
