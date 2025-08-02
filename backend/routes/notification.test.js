const request = require("supertest");
const app = require("../server");
//references chatgpt, https://medium.com/walmartglobaltech/understanding-the-jest-coverage-report-a-complete-guide-966733d6f730, https://medium.com/@blturner3527/code-coverage-and-testing-with-jest-9641b5d0e0bc

describe("Notification API", () => {
  const testEmail = "testuser@example.com";
  const testMessage = "This is a test notification.";

  it("sends a notification successfully", async () => {
    const res = await request(app)
      .post("/api/notifications")
      .send({ userEmail: testEmail, message: testMessage });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Notification sent successfully");
  });

  it("does not send notification if email is missing", async () => {
    const res = await request(app)
      .post("/api/notifications")
      .send({ message: testMessage });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("User email and message are required");
  });

  it("gets notifications for a user", async () => {
    const res = await request(app)
      .get("/api/notifications")
      .query({ email: testEmail });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("does not get notifications if email is missing", async () => {
    const res = await request(app).get("/api/notifications");

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email is required to fetch notifications");
  });
  it('sends assignment notification successfully', async () => {
  const res = await request(app)
    .post('/api/notify/assignment')
    .send({ userEmail: testEmail, message: testMessage });

  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Assignment notification sent');  
});

it('sends update notification successfully', async () => {
  const res = await request(app)
    .post('/api/notify/update')
    .send({ userEmail: testEmail, message: 'Event updated.' });

  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Update notification sent');
});

it('sends reminder notification successfully', async () => {
  const res = await request(app)
    .post('/api/notify/reminder')
    .send({ userEmail: testEmail, message: 'Reminder: Your event is tomorrow.' });

  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Reminder notification sent');
});

});
