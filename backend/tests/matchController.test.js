const { matchUserToEvents, getMatchesForAll } = require('../controllers/matchController');

describe('matchUserToEvents', () => {
  it('should return true when location, and at least one skill and date match', () => {
    const volunteer = {
      city: "Houston",
      state: "TX",
      requiredSkills: ["Cleaning", "Organization"],
      date: ["2025-07-26"]
    };

    const event = {
      location: "Houston, TX",
      skills: ["Teamwork", "Cleaning"],
      date: ["2025-07-28", "2025-07-26"]
    };

    expect(matchUserToEvents(volunteer, event)).toBe(true);
  });

  it('should return false when location is not matched', () => {
    const volunteer = {
      city: "Cupertino",
      state: "CA",
      requiredSkills: ["Cleaning"],
      date: ["2025-07-26"]
    };

    const event = { 
      location: "Houston",
      skills: ["Cleaning"],
      date: ["2025-07-26"]
    };
    expect(matchUserToEvents(volunteer, event)).toBe(false);
    });

      it('should return false when skills is not matched', () => {
    const volunteer = {
      city: "Cupertino",
      state: "CA",
      requiredSkills: ["Cleaning"],
      date: ["2025-07-26"]
    };

    const event = { 
      location: "Cupertino, CA",
      skills: ["Organization"],
      date: ["2025-07-26"]
    };
    expect(matchUserToEvents(volunteer, event)).toBe(false);
    });

      it('should return false when at least one date is not matched', () => {
    const volunteer = {
      city: "Houston",
      state: "TX",
      requiredSkills: ["Cleaning"],
      date: ["2025-07-26"]
    };

    const event = { 
      location: "Houston",
      skills: ["Cleaning"],
      date: ["2025-07-28", "2025-07-29"]
    };
    expect(matchUserToEvents(volunteer, event)).toBe(false);
    });
  });

  describe('getMatchesForAll', () => {
    it('should return correct matches for all volunteers/users', () => {
      const req ={};
      const res ={
        json:jest.fn()
      };

      //simulate req and res
      getMatchesForAll(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.any(Array)); 

      const result = res.json.mock.calls[0][0];

      //check matches are correct for multiple users
      const volA = result.find(v => v.volunteer.includes("Volunteer A"));
      expect(volA.matches.length).toBe(2);
      expect(volA.matches[0].eventName).toBe("Beach Cleanup");

      const volC = result.find(v => v.volunteer.includes("Volunteer C"));
      expect(volC.matches.length).toBe(1);
      expect(volC.matches[0].eventName).toBe("Tree Planting");

    });

  });
