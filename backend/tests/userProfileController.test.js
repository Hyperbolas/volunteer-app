jest.mock('../database/db', () => ({ query: jest.fn() }));

const db = require('../database/db');
const { getUserProfile, updateUserProfile } = require('../controllers/userProfileController');

describe('userProfileController.getUserProfile', () => {
  let req, res;

  beforeEach(() => {
    req = { params: { userId: '1' } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  it('returns 200 with mapped profile when found', async () => {
    db.query.mockResolvedValue({
      rows: [{
        full_name: 'Alice',
        address: '123 St',
        city: 'Houston',
        state: 'TX',
        zipcode: '77001',
        skills: ['Cooking'],
        preferences: 'Evening',
        availability: [new Date('2025-08-01T00:00:00Z')],
      }],
    });

    await getUserProfile(req, res);

    expect(db.query).toHaveBeenCalledWith(
      'SELECT * FROM UserProfile WHERE user_id = $1',
      ['1']
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      fullName: 'Alice',
      address1: '123 St',
      address2: '',
      city: 'Houston',
      state: 'TX',
      zipCode: '77001',
      skills: ['Cooking'],
      preferences: 'Evening',
      availability: ['2025-08-01'],
    });
  });

  it('maps preferences to "" when DB returns null', async () => {
    db.query.mockResolvedValueOnce({
      rows: [{
        full_name: 'Alice',
        address: '123 St',
        city: 'Houston',
        state: 'TX',
        zipcode: '77001',
        skills: ['Cooking'],
        preferences: null,
        availability: [new Date('2025-08-01T00:00:00Z')],
      }],
    });

    await getUserProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ preferences: '' }));
  });

  it('returns 404 if profile not found', async () => {
    db.query.mockResolvedValue({ rows: [] });

    await getUserProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Profile not found' });
  });

  it('returns 500 on DB error', async () => {
    db.query.mockRejectedValue(new Error('boom'));

    await getUserProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
  });
});

describe('userProfileController.updateUserProfile', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { userId: '1' },
      body: {
        fullName: 'Alice',
        address1: '123 St',
        address2: '',
        city: 'Houston',
        state: 'TX',
        zipCode: '77001',
        skills: ['Cooking'],
        preferences: 'Evening',
        availability: ['2025-08-01'],
      },
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  it('returns 200 when upsert succeeds', async () => {
    db.query.mockResolvedValue({});

    await updateUserProfile(req, res);

    expect(db.query).toHaveBeenCalledTimes(1);
    const [sql, params] = db.query.mock.calls[0];
    expect(sql).toEqual(expect.stringContaining('INSERT INTO UserProfile'));
    expect(sql).toEqual(expect.stringContaining('ON CONFLICT (user_id)'));
    expect(params[0]).toBe('1');
    expect(params[1]).toBe('Alice');
    expect(params[2]).toBe('123 St');
    expect(params[3]).toBe('Houston');
    expect(params[4]).toBe('TX');
    expect(params[5]).toBe('77001');
    expect(params[6]).toEqual(['Cooking']);
    expect(params[7]).toBe('Evening');
    expect(Array.isArray(params[8])).toBe(true);
    expect(params[8][0] instanceof Date).toBe(true);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Profile saved successfully' });
  });

  it('returns 400 when validation fails', async () => {
    req.body.fullName = ''; // force validation error

    await updateUserProfile(req, res);

    expect(db.query).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Validation failed', errors: expect.any(Object) })
    );
  });

  it('returns 500 when DB throws', async () => {
    db.query.mockRejectedValue(new Error('db down'));

    await updateUserProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
  });

  // ---- Branch coverage tests for validateUserProfile ----
  it('returns 400 when address1 is missing', async () => {
    req.body.address1 = undefined;
    await updateUserProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 when city is missing', async () => {
    req.body.city = '';
    await updateUserProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 when state is missing', async () => {
    req.body.state = undefined;
    await updateUserProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 when zipCode missing', async () => {
    req.body.zipCode = undefined;
    await updateUserProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 when zipCode too short', async () => {
    req.body.zipCode = '1234';
    await updateUserProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 when skills empty', async () => {
    req.body.skills = [];
    await updateUserProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 when availability empty', async () => {
    req.body.availability = [];
    await updateUserProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 when address2 is not a string', async () => {
    req.body.address2 = 123;
    await updateUserProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
