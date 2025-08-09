const db = require('../database/db');
jest.mock('../database/db');

const { exportEventDetailsCsv } = require('../controllers/eventController');

// Mock Express res object
const mockRes = () => {
  const res = {};
  res.setHeader = jest.fn();
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn();
  res.json = jest.fn();
  return res;
};

describe('exportEventDetailsCsv', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns CSV with formatted rows', async () => {
    const fakeRows = [
      {
        eventname: 'Food Drive',
        description: 'Help collect food',
        location: 'Houston',
        skills: ['Teamwork', 'Organization'],
        date: '2025-08-20',
        urgency: 'High',
        status: 'Active'
      },
      {
        eventname: 'Beach Cleanup',
        description: 'Clean the beach',
        location: 'Miami',
        skills: ['Cleaning', 'Teamwork'],
        date: '2025-08-21',
        urgency: 'Low',
        status: 'Pending'
      }
    ];

    db.query.mockResolvedValue({ rows: fakeRows });

    const req = {};
    const res = mockRes();

    await exportEventDetailsCsv(req, res);

    expect(res.setHeader).toHaveBeenCalledWith(
      'Content-Type',
      'text/csv; charset=utf-8'
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      'Content-Disposition',
      expect.stringContaining('event-details.csv')
    );
    expect(res.status).toHaveBeenCalledWith(200);

    const csvText = res.send.mock.calls[0][0];
    const firstLine = csvText.split('\n')[0].trim();
    expect(firstLine).toBe('event,description,location,skills,date,urgency,status');
    expect(csvText).toContain(
      'Food Drive,Help collect food,Houston,"Teamwork, Organization",2025-08-20,High,Active'
    );
    expect(csvText).toContain(
      'Beach Cleanup,Clean the beach,Miami,"Cleaning, Teamwork",2025-08-21,Low,Pending'
    );
  });

  test('handles DB error (500)', async () => {
    db.query.mockRejectedValue(new Error('db down'));

    const req = {};
    const res = mockRes();

    await exportEventDetailsCsv(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'CSV export failed' });
  });

  test('handles null skills and null date', async () => {
    const fakeRows = [
      {
        eventname: 'Test Event',
        description: 'Test description',
        location: 'Test City',
        skills: null,
        date: null,
        urgency: 'Medium',
        status: 'Pending'
      }
    ];

    db.query.mockResolvedValue({ rows: fakeRows });

    const req = {};
    const res = mockRes();

    await exportEventDetailsCsv(req, res);

    const csvText = res.send.mock.calls[0][0];
    expect(csvText).toContain('Test Event,Test description,Test City,,,Medium,Pending');
  });

  test('handles non-array skills and null date', async () => {
    const fakeRows = [
      {
        eventname: 'eventname',
        description: 'description',
        location: 'location',
        skills: 'skills',
        date: 'date',
        urgency: 'urgency',
        status: 'status'
      }
    ];

    db.query.mockResolvedValue({ rows: fakeRows });

    const req = {};
    const res = mockRes();

    await exportEventDetailsCsv(req, res);

    const csvText = res.send.mock.calls[0][0];
    expect(csvText).toContain('eventname,description,location,skills,urgency,date,status');
  });
});
