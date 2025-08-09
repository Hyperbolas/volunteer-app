const request = require("supertest");
const app = require("../server");
const db = require("../database/db"); // Database connection

describe("Notification API", () => {
  const testEmail = "testuser@example.com";
  const testMessage = "This is a test notification.";
  const testEventName = "Test Event";

  // Before all tests, insert a test user
  beforeAll(async () => {
    await db.query(`DELETE FROM Notifications`);
    await db.query(`DELETE FROM UserCredentials WHERE email = $1`, [testEmail]);
    await db.query(
      `INSERT INTO UserCredentials (email, password_hash, role) VALUES ($1, $2, $3)`,
      [testEmail, "dummyhash", "volunteer"]
    );
  });

  // Clean up after all tests
  afterAll(async () => {
    await db.query(`DELETE FROM Notifications`);
    await db.query(`DELETE FROM UserCredentials WHERE email = $1`, [testEmail]);
    await db.end(); // Close DB pool
  });

  // ✅ Existing Tests
  it("sends assignment notification successfully", async () => {
    const res = await request(app)
      .post("/api/notify/assignment")
      .send({ userEmail: testEmail, eventName: testEventName });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Assignment notification sent");
  });

  it("gets notifications for a user", async () => {
    const res = await request(app)
      .get("/api/notifications")
      .query({ email: testEmail });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("does not send notification if email is missing", async () => {
    const res = await request(app)
      .post("/api/notify/assignment")
      .send({ eventName: testEventName });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("User email and event name are required");
  });

  it("does not get notifications if email is missing", async () => {
    const res = await request(app).get("/api/notifications");

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email is required to fetch notifications");
  });

  it("sends update notification successfully", async () => {
    const res = await request(app)
      .post("/api/notify/update")
      .send({ userEmail: testEmail, message: "Event updated." });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Update notification sent");
  });

  it("sends reminder notification successfully", async () => {
    const res = await request(app)
      .post("/api/notify/reminder")
      .send({
        userEmail: testEmail,
        message: "Reminder: Your event is tomorrow.",
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Reminder notification sent");
  });

  // ✅ New Tests for Full Coverage

  it("sends a basic notification using sendNotification", async () => {
    const res = await request(app)
      .post("/api/notify")
      .send({ userEmail: testEmail, message: testMessage });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Notification sent successfully");
  });

  it("fails to send basic notification if fields are missing", async () => {
    const res = await request(app)
      .post("/api/notify")
      .send({ userEmail: testEmail }); // Missing message

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("User email and message are required");
  });

  it("handles DB error during notification fetch", async () => {
    const originalQuery = db.query;
    db.query = jest.fn(() => {
      throw new Error("Simulated DB error");
    });

    const res = await request(app)
      .get("/api/notifications")
      .query({ email: testEmail });

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Failed to fetch notifications");

    db.query = originalQuery;
  });

  it("returns 404 if user email is not found during assignment notification", async () => {
    const res = await request(app)
      .post("/api/notify/assignment")
      .send({ userEmail: "unknown@example.com", eventName: "Event X" });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("User not found");
  });

  it("handles DB error in sendAssignmentNotification", async () => {
    const originalQuery = db.query;
    db.query = jest
      .fn()
      .mockResolvedValueOnce({ rows: [{ id: 123 }] }) // user lookup
      .mockRejectedValueOnce(new Error("Simulated insert failure")); // insert fails

    const res = await request(app)
      .post("/api/notify/assignment")
      .send({ userEmail: testEmail, eventName: "Broken Event" });

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Failed to send assignment notification");

    db.query = originalQuery;
  });
});
