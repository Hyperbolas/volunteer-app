// const mockDb = require('../database/db');

// jest.mock('../database/db')


// const {
//   matchUserToEvents,
//   getMatchesForUser,
//   updateEventStatus
// } = require('../controllers/matchController');

// //matchUserToEvents
// describe('matchUserToEvents', () => {
//   it('should return true when date, skills, and location match', () => {
//     const volunteer = {
//       date: '2025-08-05,2025-08-06',
//       skills: 'first aid,teaching',
//       city: 'Austin',
//       state: 'TX'
//     };
//     const event = {
//       date: '2025-08-06',
//       skills: 'teaching',
//       location: 'Austin, TX'
//     };

//     const result = matchUserToEvents(volunteer, event);
//     expect(result).toBe(true);
//   });

//   it('should return false when location does not match', () => {
//     const volunteer = {
//       date: '2025-08-06',
//       skills: 'teaching',
//       city: 'Dallas',
//       state: 'TX'
//     };
//     const event = {
//       date: '2025-08-06',
//       skills: 'teaching',
//       location: 'Austin, TX'
//     };

//     const result = matchUserToEvents(volunteer, event);
//     expect(result).toBe(false);
//   });
// });

// //GetmatchesForUsers
// describe('getMatchesForUser', () => {
//   it('should return matches for the user', async () => {
//     const req = { params: { userId: '1' } };
//     const res = {
//       json: jest.fn(),
//       status: jest.fn().mockReturnThis()
//     };

//     const fakeVolunteer = {
//       user_id: 1,
//       full_name: 'Jane Doe',
//       date: '2025-08-06',
//       skills: 'teaching',
//       city: 'Austin',
//       state: 'TX'
//     };
//     const fakeEvent = {
//       date: '2025-08-06',
//       skills: 'teaching',
//       location: 'Austin, TX'
//     };

//     mockDb.query
//       .mockResolvedValueOnce({ rows: [fakeVolunteer] }) //for userprofile
//       .mockResolvedValueOnce({ rows: [fakeEvent] }); //for eventdetails

//     await getMatchesForUser(req, res);

//     expect(res.json).toHaveBeenCalledWith([
//       { volunteer: 'Jane Doe', matches: [fakeEvent] }
//     ]);
//   });

//   it('should return 404 when volunteer not found', async () => {
//     const req = { params: { userId: '' } };
//     const res = {
//       json: jest.fn(),
//       status: jest.fn().mockReturnThis()
//     };

//     mockDb.query.mockResolvedValueOnce({ rows: [{ full_name: "Test User", skills: ['Cooking'], preferences: 'Outdoor' }] });

//     await getMatchesForUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ error: 'Volunteer not found' });
//   });
// });

// //updateEventStatus
// describe('updateEventStatus', () => {
//   it('should update the status of an event', async () => {
//     const req = {
//       params: { eventId: '5' },
//       body: { status: 'Attended' }
//     };
//     const res = {
//       json: jest.fn(),
//       status: jest.fn().mockReturnThis()
//     };

//     mockDb.query.mockResolvedValueOnce(); //no return needed for update

//     await updateEventStatus(req, res);

//     expect(mockDb.query).toHaveBeenCalledWith(
//       'UPDATE eventdetails SET status = $1 WHERE id = $2',
//       ['Attended', '5']
//     );
//     expect(res.json).toHaveBeenCalledWith({ message: 'Status updated successfully' });
//   });

//   it('should return 500 on error', async () => {
//     const req = { params: { eventId: '5' }, body: { status: 'Attended' } };
//     const res = {
//       json: jest.fn(),
//       status: jest.fn().mockReturnThis()
//     };

//     mockDb.query.mockRejectedValueOnce(new Error('DB error'));

//     await updateEventStatus(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       error: 'Server error while updating status'
//     });
//   });

//     it('should return empty matches if no event matches volunteer', async () => {
//     const req = { params: { userId: '1' } };
//     const res = {
//       json: jest.fn(),
//       status: jest.fn().mockReturnThis()
//     };

//     const fakeVolunteer = {
//       user_id: 1,
//       full_name: 'Jane Doe',
//       date: '2025-08-06',
//       skills: 'teaching',
//       city: 'Austin',
//       state: 'TX'
//     };
//     const fakeEvent = {
//       date: '2025-08-07', // mismatch
//       skills: 'first aid', // mismatch
//       location: 'Dallas, TX' // mismatch
//     };

//     mockDb.query
//       .mockResolvedValueOnce({ rows: [fakeVolunteer] })
//       .mockResolvedValueOnce({ rows: [fakeEvent] });

//     await getMatchesForUser(req, res);

//     expect(res.json).toHaveBeenCalledWith([
//       { volunteer: 'Jane Doe', matches: [] }
//     ]);
//   });
//     it('should return 500 if database query fails', async () => {
//     const req = { params: { userId: 'fakeVolunteer' } };
//     const res = {
//       json: jest.fn(),
//       status: jest.fn().mockReturnThis()
//     };

//     mockDb.query.mockRejectedValueOnce(new Error('Database error'));

//     await getMatchesForUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       error: 'Server error while matching user'
//     });
//   });
// });

const matchController = require('../controllers/matchController');
const db = require('../database/db');
jest.mock('../database/db');

describe('getMatchesForUser', () => {
  it('should return matched events for a user', async () => {
    const req = { params: { userId: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const fakeVolunteer = {
      id: 1,
      full_name: 'Jane Doe',
      skills: 'teaching',
      city: 'Houston',
      state: 'TX',
      date: ['2025-08-10'],
    };

    const fakeEvent = {
      id: 101,
      skills: 'teaching',
      location: 'Houston, TX',
      date: ['2025-08-10'],
    };

    //Mock DB responses
    db.query
      .mockResolvedValueOnce({ rows: [fakeVolunteer] }) // userprofile
      .mockResolvedValueOnce({ rows: [fakeEvent] });    // eventdetails

    await matchController.getMatchesForUser(req, res);


    //Check response format
    expect(res.json).toHaveBeenCalledWith([
      {
        volunteer: 'Jane Doe',
        matches: [fakeEvent],
      },
    ]);
  });
});

it('should return 404 when volunteer not found', async () => {
    const req = { params: { userId: 2} };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    db.query.mockResolvedValueOnce({ rows: []});
    db.query.mockResolvedValueOnce({ rows: [] });

    await matchController.getMatchesForUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Volunteer not found' });
  });

//updateEventStatus
describe('updateEventStatus', () => {
  it('should update the status of an event', async () => {
    const req = {
      params: { userId: '1', eventId: '5' },
      body: { status: 'Attended' }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    db.query.mockResolvedValueOnce(); //no return needed for update

    await matchController.updateEventStatus(req, res);

    expect(db.query).toHaveBeenCalledWith(
      'UPDATE userevents SET status = $1 WHERE user_id = $2 AND event_id = $3',
      ['Attended', '1', '5']
    );
    expect(res.json).toHaveBeenCalledWith({ message: 'Status updated successfully' });
  });
});
