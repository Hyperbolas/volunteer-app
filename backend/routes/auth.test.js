const request = require("supertest");
const app = require("../server");
const pool = require("../database/db");
const bcrypt = require("bcrypt");

describe("Auth API", () => {
  it("should register a new user", async () => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    const res = await request(app).post("/api/register").send({
      email: uniqueEmail,
      password: "testpass",
      role: "volunteer",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "User registered");
  });

  it("should not register the same user twice", async () => {
    await request(app).post("/api/register").send({
      email: "duplicate@example.com",
      password: "pass123",
      role: "admin",
    });

    const res = await request(app).post("/api/register").send({
      email: "duplicate@example.com",
      password: "pass123",
      role: "admin",
    });

    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty("error", "User already exists");
  });

  it("should login with valid credentials", async () => {
    await request(app).post("/api/register").send({
      email: "loginuser@example.com",
      password: "loginpass",
      role: "volunteer",
    });

    const res = await request(app).post("/api/login").send({
      email: "loginuser@example.com",
      password: "loginpass",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Login successful");
    expect(res.body).toHaveProperty("role", "volunteer");
  });

  it("should not login with invalid credentials", async () => {
    const res = await request(app).post("/api/login").send({
      email: "fake@example.com",
      password: "wrongpass",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error", "Invalid credentials");
  });

  // --- Additional tests for missing fields and errors ---

  it("should return 400 if register missing fields", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({ email: "a@b.com", password: "123" }); // missing role

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/All fields are required/i);
  });

  it("should return 400 if login missing fields", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "a@b.com" }); // missing password

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Email and password are required/i);
  });

  it("should return 401 if login user not found", async () => {
    jest.spyOn(pool, "query").mockResolvedValueOnce({ rows: [] });

    const res = await request(app)
      .post("/api/login")
      .send({ email: "nouser@example.com", password: "any" });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/Invalid credentials/i);

    pool.query.mockRestore();
  });

  it("should return 401 if login password mismatch", async () => {
    const fakeUser = {
      id: 1,
      password_hash: await bcrypt.hash("rightpass", 10),
      role: "volunteer",
    };

    jest.spyOn(pool, "query").mockResolvedValueOnce({ rows: [fakeUser] });
    jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false);

    const res = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com", password: "wrongpass" });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/Invalid credentials/i);

    pool.query.mockRestore();
    bcrypt.compare.mockRestore();
  });

  it("should return 500 if DB error on login", async () => {
    jest.spyOn(pool, "query").mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app)
      .post("/api/login")
      .send({ email: "err@example.com", password: "any" });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toMatch(/Server error/i);

    pool.query.mockRestore();
  });
});
