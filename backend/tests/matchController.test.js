const db = require('../database/db');

// Mock db first
jest.mock('../database/db');

describe('matchController', () => {
  let matchController;
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    matchController = require('../controllers/matchController');
    req = {};
    res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  });

  describe('getAllUsers', () => {
    it('should return all users from userprofile', async () => {
      const fakeUsers = [
        { user_id: 1, full_name: 'Jane Doe', skills: 'Teaching' },
        { user_id: 2, full_name: 'John Smith', skills: 'Cleaning' }
      ];

      db.query.mockResolvedValueOnce({ rows: fakeUsers });

      await matchController.getAllUsers(req, res);

      expect(db.query).toHaveBeenCalledWith(`
      SELECT user_id, full_name, skills 
      FROM userprofile
    `);
      expect(res.json).toHaveBeenCalledWith(fakeUsers);
    });

    it('should return 500 on database error', async () => {
      db.query.mockRejectedValueOnce(new Error('DB error'));

      await matchController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
  });

  describe('getMatchesForUser', () => {
    beforeEach(() => {
      req = { params: { userId: '1' } };
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    it('should return 404 if volunteer not found', async () => {
      db.query
        .mockResolvedValueOnce({ rows: [] }) // volunteer not found
        .mockResolvedValueOnce({ rows: [] });

      await matchController.getMatchesForUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Volunteer not found' });
    });

    it('should return matched events with status', async () => {
      jest.spyOn(matchController, 'matchUserToEvents').mockImplementation(
        (volunteer, event) => event.id === 10
      );

      db.query
        // volunteer found
        .mockResolvedValueOnce({ rows: [{ user_id: 1, full_name: 'Jane Doe', skills: ['Cleaning'] }] })
        // events list
        .mockResolvedValueOnce({
          rows: [
            { id: 10, eventname: 'Beach Cleanup', skills: ['Cleaning'] },
            { id: 20, eventname: 'Food Drive', skills: ['Cooking'] }
          ]
        })
        // insert into UserEvents
        .mockResolvedValueOnce({})
        // select status
        .mockResolvedValueOnce({ rows: [{ status: 'Select' }] });

      await matchController.getMatchesForUser(req, res);

      expect(matchController.matchUserToEvents).toHaveBeenCalledTimes(2);
      expect(res.json).toHaveBeenCalledWith([
        {
          volunteer: 'Jane Doe',
          matches: [
            expect.objectContaining({
              id: 10,
              eventname: 'Beach Cleanup',
              skills: ['Cleaning'],
              userStatus: 'Select'
            })
          ]
        }
      ]);
    });

    it('should return empty matches if no events match', async () => {
      jest.spyOn(matchController, 'matchUserToEvents').mockReturnValue(false);

      db.query
        // volunteer found
        .mockResolvedValueOnce({ rows: [{ user_id: 1, full_name: 'Jane Doe', skills: ['Cleaning'] }] })
        // events list
        .mockResolvedValueOnce({ rows: [{ id: 10, eventname: 'Beach Cleanup', skills: ['Cleaning'] }] });

      await matchController.getMatchesForUser(req, res);

      expect(matchController.matchUserToEvents).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([{ volunteer: 'Jane Doe', matches: [] }]);
    });

    it('should handle DB errors', async () => {
      db.query.mockRejectedValueOnce(new Error('DB failed'));

      await matchController.getMatchesForUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error while matching user' });
    });
  });

  describe('updateEventStatus', () => {
    it('should update the status of an event', async () => {
      const req = { params: { userId: '1', eventId: '5' }, body: { status: 'Attended' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      db.query.mockResolvedValueOnce();

      await matchController.updateEventStatus(req, res);

      expect(db.query).toHaveBeenCalledWith(
        'UPDATE userevents SET status = $1 WHERE user_id = $2 AND event_id = $3',
        ['Attended', '1', '5']
      );
      expect(res.json).toHaveBeenCalledWith({ message: 'Status updated successfully' });
    });
  });

  describe('normalizeInput', () => {
    it('returns same array if input is already an array', () => {
      expect(matchController.normalizeInput(['a', 'b'])).toEqual(['a', 'b']);
    });

    it('splits comma string into array', () => {
      expect(matchController.normalizeInput('a,b')).toEqual(['a', 'b']);
    });

    it('returns empty array for invalid input', () => {
      expect(matchController.normalizeInput(123)).toEqual([]);
    });
  });

  describe('normalizeDate', () => {
    it('returns YYYY-MM-DD for valid date string', () => {
      expect(matchController.normalizeDate('2025-08-09')).toEqual('2025-08-09');
    });

    it('returns null for invalid date', () => {
      expect(matchController.normalizeDate('not-a-date')).toBeNull();
    });
  });
});
