jest.mock("../database/db", () => ({
  query: jest.fn(),
}));

const db = require("../database/db");

const {
  getEvents,
  createEvent,
  getParticipationHistory,
} = require("../controllers/eventController");

// Create mock req/res objects for testing
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res); // allow chaining
  res.json = jest.fn();
  return res;
};

describe("Event Controller Tests", () => {
  describe("getEvents", () => {
    it("should return all events", async () => {
      // Mock DB query response for events
      const fakeEvents = [
        { id: 1, eventName: "Event 1" },
        { id: 2, eventName: "Event 2" },
      ];
      db.query.mockResolvedValue({ rows: fakeEvents });

      const req = {};
      const res = mockResponse();

      await getEvents(req, res);

      expect(res.json).toHaveBeenCalled();
      const result = res.json.mock.calls[0][0];
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("createEvent", () => {
    it("should return 400 if fields are missing", async () => {
      const req = {
        body: {
          eventName: "New Event",
          // Missing fields intentionally
        },
      };
      const res = mockResponse();

      await createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "All fields are required.",
      });
    });

    it("should create a new event if all fields are provided", async () => {
      const newEvent = {
        eventName: "Volunteer Fair",
        description: "Local fair for volunteers",
        location: "City Hall",
        skills: ["Coordination"],
        urgency: "Medium",
        date: "2025-08-10",
      };

      // Mock DB insert to return created event with id
      db.query.mockResolvedValue({
        rows: [{ id: 123, ...newEvent }],
      });

      const req = { body: newEvent };
      const res = mockResponse();

      await createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      const createdEvent = res.json.mock.calls[0][0];
      expect(createdEvent).toMatchObject(newEvent);
      expect(createdEvent).toHaveProperty("id");
    });
  });

  describe("getParticipationHistory", () => {
    it("should return all participation data", async () => {
      // Mock DB query response for participation
      const fakeParticipation = [
        { volunteerName: "Alice", eventName: "Event 1" },
        { volunteerName: "Bob", eventName: "Event 2" },
      ];
      db.query.mockResolvedValue({ rows: fakeParticipation });

      const req = {};
      const res = mockResponse();

      await getParticipationHistory(req, res);

      expect(res.json).toHaveBeenCalled();
      const result = res.json.mock.calls[0][0];
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty("volunteerName");
    });
  });
});
