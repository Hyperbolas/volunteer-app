const {
  getAllVolunteerHistories,
  exportVolunteerHistoryCsv,
} = require("../../backend/controllers/volunteerHistoryController");

jest.mock("../../backend/database/db", () => ({ query: jest.fn() }));
const db = require("../../backend/database/db");

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn();
  res.send = jest.fn();
  res.headersSent = false;
  return res;
}

describe("volunteerHistoryController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllVolunteerHistories returns 200 + rows (date is a string now)", async () => {
    const fakeRows = [
      {
        eventname: "Cleanup",
        requiredskills: ["Cleaning"],
        date: "2025-08-01", 
        status: "Completed",
        volunteername: "Alice",
      },
    ];
    db.query.mockResolvedValue({ rows: fakeRows });

    const req = {};
    const res = mockRes();

    await getAllVolunteerHistories(req, res);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeRows);
    expect(Array.isArray(fakeRows[0].requiredskills)).toBe(true);
    expect(typeof fakeRows[0].date).toBe("string");
  });

  test("getAllVolunteerHistories handles DB error (500)", async () => {
    const boom = new Error("DB is down");
    db.query.mockRejectedValue(boom);
    const req = {};
    const res = mockRes();
    console.error = jest.fn();

    await getAllVolunteerHistories(req, res);

    expect(console.error).toHaveBeenCalledWith(
      "Error fetching volunteer history:",
      boom
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
  });

  test("exportVolunteerHistoryCsv returns CSV with formatted rows", async () => {
    const fakeRows = [
      {
        eventname: "Food Drive",
        requiredskills: ["Teamwork", "Organization"],
        date: "2025-08-20", 
        status: "Completed",
        volunteername: "Alice Bobby",
      },
      {
        eventname: "Beach Cleanup",
        requiredskills: ["Teamwork", "Cleaning"],
        date: "2025-08-21",
        status: "Pending",
        volunteername: "Bob Lobby",
      },
    ];
    db.query.mockResolvedValue({ rows: fakeRows });

    const req = {};
    const res = mockRes();

    await exportVolunteerHistoryCsv(req, res);

    // headers
    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "text/csv; charset=utf-8"
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Disposition",
      expect.stringContaining("volunteer-participation-history.csv")
    );

    // body
    expect(res.status).toHaveBeenCalledWith(200);
    const csvText = res.send.mock.calls[0][0];

    const firstLine = csvText.split("\n")[0].trim();
    expect(firstLine).toBe("Volunteer,Event,Required Skills,Date,Status");

    expect(csvText).toContain(
      'Alice Bobby,Food Drive,"Teamwork, Organization",2025-08-20,Completed'
    );
    expect(csvText).toContain(
      'Bob Lobby,Beach Cleanup,"Teamwork, Cleaning",2025-08-21,Pending'
    );
  });

  test("exportVolunteerHistoryCsv handles DB error (500)", async () => {
    db.query.mockRejectedValue(new Error("db down"));
    const req = {};
    const res = mockRes();

    await exportVolunteerHistoryCsv(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "CSV export failed" });
  });
});
test("exportVolunteerHistoryCsv handles rows with null skills and null date", async () => {
  const fakeRows = [
    {
      eventname: "Test Event",
      requiredskills: null,
      date: null,  
      status: "Pending",
      volunteername: "No Skills Volunteer",
    },
  ];
  db.query.mockResolvedValue({ rows: fakeRows });

  const req = {};
  const res = mockRes();

  await exportVolunteerHistoryCsv(req, res);

  const csvText = res.send.mock.calls[0][0];
  expect(csvText).toContain("No Skills Volunteer,Test Event,,,");

});
test("exportVolunteerHistoryCsv handles non-array skills and null date", async () => {
  const fakeRows = [
    {
      eventname: "Branch Test Event",
      requiredskills: "SingleSkill", 
      date: null,       
      status: "Pending",
      volunteername: null,  
    },
  ];
  db.query.mockResolvedValue({ rows: fakeRows });

  const req = {};
  const res = mockRes();

  await exportVolunteerHistoryCsv(req, res);

  const csvText = res.send.mock.calls[0][0];
  expect(csvText).toContain(",Branch Test Event,SingleSkill,,Pending");
});

