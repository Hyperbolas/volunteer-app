// tests/controllers/volunteerHistoryController.test.js
const { getAllVolunteerHistories } = require("../../backend/controllers/volunteerHistoryController");
const db = require("../../backend/database/db");

jest.mock("../../backend/database/db");

describe("getAllVolunteerHistories", () => {
  let req, res;

  beforeEach(() => {
    req = {}; 
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  it("returns 200 + rows when db.query succeeds", async () => {
    const fakeRows = [
      {
        eventname: "Cleanup",
        requiredskills: ["Cleaning"],
        date: ["2025-08-01"],
        status: "Completed",
        volunteername: "Alice"
      }
    ];
    db.query.mockResolvedValue({ rows: fakeRows });

    await getAllVolunteerHistories(req, res);

    expect(db.query).toHaveBeenCalled();                  // we called into the DB
    expect(res.status).toHaveBeenCalledWith(200);         // we send 200
    expect(res.json).toHaveBeenCalledWith(fakeRows);      // we send back its rows
  });

  it("returns 500 + error JSON when db.query throws", async () => {
    const boom = new Error("DB is down");
    db.query.mockRejectedValue(boom);
    console.error = jest.fn();

    await getAllVolunteerHistories(req, res);

    expect(console.error).toHaveBeenCalledWith("Error fetching volunteer history:", boom);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
  });
});
