// const db = require('../database/db');

// // Mock matchController AFTER mocking db
// jest.mock('../database/db');
// jest.mock('../controllers/matchController', () => {
//   const actualController = jest.requireActual('../controllers/matchController');
//   return {
//     ...actualController,
//     matchUserToEvents: jest.fn()
//   };
// });

// const matchController = require('../controllers/matchController');

// describe('matchController', () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // resets call counts & mockResolvedValueOnce chains
//   });

//   describe('getAllUsers', () => {
//     it('should return all users from userprofile', async () => {
//       const req = {};
//       const res = {
//         json: jest.fn(),
//         status: jest.fn().mockReturnThis()
//       };

//       const fakeUsers = [
//         { user_id: 1, full_name: 'Jane Doe', skills: 'Teaching' },
//         { user_id: 2, full_name: 'John Smith', skills: 'Cleaning' }
//       ];

//       db.query.mockResolvedValueOnce({ rows: fakeUsers });

//       await matchController.getAllUsers(req, res);

//       expect(db.query).toHaveBeenCalledWith(`
//       SELECT user_id, full_name, skills 
//       FROM userprofile
//     `);
//       expect(res.json).toHaveBeenCalledWith(fakeUsers);
//     });

//     it('should return 500 on database error', async () => {
//       const req = {};
//       const res = {
//         json: jest.fn(),
//         status: jest.fn().mockReturnThis()
//       };

//       db.query.mockRejectedValueOnce(new Error('DB error'));

//       await matchController.getAllUsers(req, res);

//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
//     });
//   });

//   describe('getMatchesForUser', () => {
//     let req, res;

//     beforeEach(() => {
//       req = { params: { userId: '1' } };
//       res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       };
//     });

//     it('should return 404 if volunteer not found', async () => {
//       db.query
//         .mockResolvedValueOnce({ rows: [] }) // volunteer not found
//         .mockResolvedValueOnce({ rows: [] });

//       await matchController.getMatchesForUser(req, res);

//       expect(res.status).toHaveBeenCalledWith(404);
//       expect(res.json).toHaveBeenCalledWith({ error: 'Volunteer not found' });
//     });

//     it('should return matched events with status', async () => {
//       db.query
//         // 1: volunteer found
//         .mockResolvedValueOnce({ rows: [{ user_id: 1, full_name: 'Jane Doe', skills: ['Cleaning'] }] })
//         // 2: events list
//         .mockResolvedValueOnce({
//           rows: [
//             { id: 10, eventname: 'Beach Cleanup', skills: ['Cleaning'] },
//             { id: 20, eventname: 'Food Drive', skills: ['Cooking'] }
//           ]
//         })
//         // 3: insert into UserEvents
//         .mockResolvedValueOnce({ rows: [{user_id: 1, event_id: 10, status:'Attending' }] })
//         // 4: select status
//         .mockResolvedValueOnce({ rows: [{ status: 'Select' }] });

//       matchController.matchUserToEvents.mockImplementation((volunteer, event) => event.id === 10);

//       await matchController.getMatchesForUser(req, res);

//       expect(matchController.matchUserToEvents).toHaveBeenCalledTimes(2);
//       expect(res.json).toHaveBeenCalledWith([
//         {
//           volunteer: 'Jane Doe',
//           matches: [
//             { id: 10, eventname: 'Beach Cleanup', skills: ['Cleaning'], userStatus: 'Select' }
//           ]
//         }
//       ]);
//     });

//       //updateEventStatus
//   describe('updateEventStatus', () => {
//     it('should update the status of an event', async () => {
//       const req = {
//         params: { userId: '1', eventId: '5' },
//         body: { status: 'Attended' }
//       };
//       const res = {
//         json: jest.fn(),
//         status: jest.fn().mockReturnThis()
//       };

//       db.query.mockResolvedValueOnce(); //no return needed for update

//       await matchController.updateEventStatus(req, res);

//       expect(db.query).toHaveBeenCalledWith(
//         'UPDATE userevents SET status = $1 WHERE user_id = $2 AND event_id = $3',
//         ['Attended', '1', '5']
//       );
//       expect(res.json).toHaveBeenCalledWith({ message: 'Status updated successfully' });
//     });
//   });

//     it('should handle DB errors', async () => {
//       db.query.mockRejectedValueOnce(new Error('DB failed'));

//       await matchController.getMatchesForUser(req, res);

//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({ error: 'Server error while matching user' });
//     });
//   });
// });

// test/matchController.test.js
const db = require('../database/db');

// Mock db first
jest.mock('../database/db');

describe('matchController', () => {
  let matchController;

  beforeEach(() => {
    jest.clearAllMocks();
    // Require controller fresh each time so mocks are applied
    matchController = require('../controllers/matchController');
  });

  describe('getAllUsers', () => {
    it('should return all users from userprofile', async () => {
      const req = {};
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

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
      const req = {};
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      db.query.mockRejectedValueOnce(new Error('DB error'));

      await matchController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
  });

  describe('getMatchesForUser', () => {
    let req, res;

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
      // Spy on matchUserToEvents so we control matching behavior
      jest.spyOn(matchController, 'matchUserToEvents').mockImplementation(
        (volunteer, event) => event.id === 10
      );

      db.query
        // 1: volunteer found
        .mockResolvedValueOnce({ rows: [{ user_id: 1, full_name: 'Jane Doe', skills: ['Cleaning'] }] })
        // 2: events list
        .mockResolvedValueOnce({
          rows: [
            { id: 10, eventname: 'Beach Cleanup', skills: ['Cleaning'] },
            { id: 20, eventname: 'Food Drive', skills: ['Cooking'] }
          ]
        })
        // 3: insert into UserEvents
        .mockResolvedValueOnce({})
        // 4: select status
        .mockResolvedValueOnce({ rows: [{ status: 'Select' }] });

      await matchController.getMatchesForUser(req, res);

      expect(matchController.matchUserToEvents).toHaveBeenCalledTimes(2);
      expect(res.json).toHaveBeenCalledWith([
        {
          volunteer: 'Jane Doe',
          matches: [
            { id: 10, eventname: 'Beach Cleanup', skills: ['Cleaning'], userStatus: 'Select' }
          ]
        }
      ]);
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
});
