const request = require("supertest");
const app = require("../server");

describe("Volunteer History API", () => {
  it("should return volunteer history with volunteer names", async () => {
    const res = await request(app).get("/api/volunteer-history");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    // Expect each record to have required keys
    if (res.body.length > 0) {
      const sample = res.body[0];
      expect(sample).toHaveProperty("eventname");
      expect(sample).toHaveProperty("requiredskills");
      expect(sample).toHaveProperty("date");
      expect(sample).toHaveProperty("status");
      expect(sample).toHaveProperty("volunteername");
    }
  });
});
