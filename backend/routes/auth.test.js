const request = require('supertest');
const app = require('../server');
//references chatgpt, https://medium.com/walmartglobaltech/understanding-the-jest-coverage-report-a-complete-guide-966733d6f730, https://medium.com/@blturner3527/code-coverage-and-testing-with-jest-9641b5d0e0bc

describe('Auth API', () => {
    it('should register a new user', async () => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    const res = await request(app)
      .post('/api/register')
      .send({
        email: uniqueEmail,
        password: 'testpass',
        role: 'volunteer',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered');
  });


  it('should not register the same user twice', async () => {
    // Register user first time
    await request(app)
      .post('/api/register')
      .send({
        email: 'duplicate@example.com',
        password: 'pass123',
        role: 'admin',
      });

    // Try registering again
    const res = await request(app)
      .post('/api/register')
      .send({
        email: 'duplicate@example.com',
        password: 'pass123',
        role: 'admin',
      });
    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty('error', 'User already exists');
  });

  it('should login with valid credentials', async () => {
    // Register user first
    await request(app)
      .post('/api/register')
      .send({
        email: 'loginuser@example.com',
        password: 'loginpass',
        role: 'volunteer',
      });

    // Login
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'loginuser@example.com',
        password: 'loginpass',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    expect(res.body).toHaveProperty('role', 'volunteer');
  });

  it('should not login with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'fake@example.com',
        password: 'wrongpass',
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Invalid credentials');
  });
});
