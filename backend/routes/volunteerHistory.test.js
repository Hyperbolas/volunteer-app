const request = require("supertest");
const app = require("../server");

describe("Volunteer History API", () => {
  it("should return volunteer history for a valid user ID", async () => {
    const res = await request(app).get("/api/history/1"); 

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const event = res.body[0];
      expect(event).toHaveProperty("eventName");
      expect(event).toHaveProperty("requiredSkills");
      expect(event).toHaveProperty("date");
      expect(event).toHaveProperty("status");
    }
  });

  it("should return 404 for a non-existent user ID", async () => {
    const res = await request(app).get("/api/history/99999");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("No history found for user");
  });
});
