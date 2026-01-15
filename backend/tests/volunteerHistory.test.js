const request = require("supertest");
const app = require("../server");

describe("Volunteer History API", () => {
  test("GET /api/volunteer-history returns list with expected keys (date is string)", async () => {
    const res = await request(app).get("/api/volunteer-history");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const sample = res.body[0];
      expect(sample).toHaveProperty("eventname");
      expect(sample).toHaveProperty("requiredskills");
      expect(sample).toHaveProperty("date");
      expect(sample).toHaveProperty("status");
      expect(sample).toHaveProperty("volunteername");

      // type checks
      expect(Array.isArray(sample.requiredskills)).toBe(true);
      expect(typeof sample.date === "string" || sample.date === null).toBe(true);
    }
  });

  test("GET /api/volunteer-history/export.csv returns CSV download", async () => {
    const res = await request(app).get("/api/volunteer-history/export.csv");

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toContain("text/csv");
    expect(res.headers["content-disposition"]).toContain("attachment");

    // crude sanity: header row has our columns
    const firstLine = res.text.split("\n")[0].trim();
    expect(firstLine).toBe("Volunteer,Event,Required Skills,Date,Status");
  });
});
