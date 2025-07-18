const {
  getEvents,
  createEvent,
  getParticipationHistory
} = require('../controllers/eventController');

// Create mock req/res objects for testing
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res); // allow chaining
  res.json = jest.fn();
  return res;
};

describe('Event Controller Tests', () => {
  describe('getEvents', () => {
    it('should return all events', () => {
      const req = {};
      const res = mockResponse();

      getEvents(req, res);

      expect(res.json).toHaveBeenCalled();
      const result = res.json.mock.calls[0][0];
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('createEvent', () => {
    it('should return 400 if fields are missing', () => {
      const req = {
        body: {
          eventName: 'New Event',
          // Missing fields
        }
      };
      const res = mockResponse();

      createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'All fields are required.' });
    });

    it('should create a new event if all fields are provided', () => {
      const req = {
        body: {
          eventName: 'Volunteer Fair',
          description: 'Local fair for volunteers',
          location: 'City Hall',
          skills: ['Coordination'],
          urgency: 'Medium',
          date: '2025-08-10'
        }
      };
      const res = mockResponse();

      createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      const createdEvent = res.json.mock.calls[0][0];
      expect(createdEvent).toMatchObject(req.body);
      expect(createdEvent).toHaveProperty('id');
    });
  });

  describe('getParticipationHistory', () => {
    it('should return all participation data', () => {
      const req = {};
      const res = mockResponse();

      getParticipationHistory(req, res);

      expect(res.json).toHaveBeenCalled();
      const result = res.json.mock.calls[0][0];
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty('volunteerName');
    });
  });
});
