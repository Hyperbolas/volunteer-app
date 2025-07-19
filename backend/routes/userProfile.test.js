const request = require("supertest");
const app = require("../server");
const dataStore = require("../storage/dataStore");

beforeEach(() => {
  // Reset and seed data before each test
  dataStore.profiles = {
    "1": {
      fullName: "John Doe",
      address1: "123 Main St",
      address2: "",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      skills: ["teaching"],
      availability: ["weekday"]
    }
  };
});

describe("User Profile API", () => {
  it("should return user profile if found", async () => {
    const res = await request(app).get("/api/profile/1");
    expect(res.status).toBe(200);
    expect(res.body.fullName).toBe("John Doe");
  });

  it("should return 404 if profile not found", async () => {
    const res = await request(app).get("/api/profile/9999");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Profile not found");
  });

  it("should return 200 and update profile if data is valid", async () => {
    const res = await request(app).put("/api/profile/1").send({
      fullName: "Updated Name",
      address1: "456 New St",
      address2: "Suite 100",
      city: "Dallas",
      state: "TX",
      zipCode: "75001",
      skills: ["cooking"],
      availability: ["weekend"]
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Profile saved successfully");
    expect(res.body.profile.fullName).toBe("Updated Name");
  });

  it("should return 400 if zipCode is too short", async () => {
    const res = await request(app).put("/api/profile/1").send({
      fullName: "Jane Doe",
      address1: "123 Street",
      city: "Austin",
      state: "TX",
      zipCode: "123",
      skills: ["teaching"],
      availability: ["weekday"]
    });

    expect(res.status).toBe(400);
    expect(res.body.errors.zipCode).toBe("Zip Code must be at least 5 characters");
  });

  it("should return 400 if skills is not an array", async () => {
    const res = await request(app).put("/api/profile/1").send({
      fullName: "Jane Doe",
      address1: "123 Street",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      skills: "not-an-array",
      availability: ["weekday"]
    });

    expect(res.status).toBe(400);
    expect(res.body.errors.skills).toBe("Skills must be a non-empty array");
  });

  it("should return 400 if availability is missing", async () => {
    const res = await request(app).put("/api/profile/1").send({
      fullName: "Jane Doe",
      address1: "123 Street",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      skills: ["cooking"]
    });

    expect(res.status).toBe(400);
    expect(res.body.errors.availability).toBe("Availability must be a non-empty array");
  });

  it("should accept valid optional address2 field", async () => {
    const res = await request(app).put("/api/profile/1").send({
      fullName: "John Smith",
      address1: "1000 Test Ave",
      address2: "Suite 200",
      city: "Houston",
      state: "TX",
      zipCode: "77001",
      skills: ["coding"],
      availability: ["weekend"]
    });

    expect(res.status).toBe(200);
    expect(res.body.profile.address2).toBe("Suite 200");
  });

  it("should return 400 if address2 is not a string", async () => {
    const res = await request(app).put("/api/profile/1").send({
      fullName: "Jane Doe",
      address1: "123 Street",
      address2: 12345,
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      skills: ["cooking"],
      availability: ["weekday"]
    });

    expect(res.status).toBe(400);
    expect(res.body.errors.address2).toBe("address2 must be a string");
  });
});
