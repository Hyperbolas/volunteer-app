const request = require("supertest");
const app = require("../server");
//references chatgpt, https://medium.com/walmartglobaltech/understanding-the-jest-coverage-report-a-complete-guide-966733d6f730, https://medium.com/@blturner3527/code-coverage-and-testing-with-jest-9641b5d0e0bc

describe("Server basic routes", () => {
  test("GET / should respond with running message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Backend server is running");
  });

  test("GET /api/register should respond with 404 (since it only accepts POST)", async () => {
    const res = await request(app).get("/api/register");
    expect(res.statusCode).toBe(404);
  });
});
