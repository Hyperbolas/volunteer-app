//example data replace with DB
let events = [
  {
    id: 1,
    eventName: "Tree Planting",
    description: "Tree Planting for a local park",
    location: "Chicago, IL",
    skills: ["Communication", "Teamwork"],
    urgency: "High",
    date: ["2025-07-19","2025-07-20", "2025-07-21"],
  },
  {
    id: 2,
    eventName: "Beach Cleanup",
    description: "Beach cleaning for a turtle reserve",
    location: "Houston, TX",
    skills: ["Teamwork", "Cleaning"],
    urgency: "Medium",
    date: ["2025-07-28", "2025-07-26"],
  },
  {
    id: 3,
    eventName: "Food Drive",
    description: "Food drive for the elderly",
    location: "Houston, TX",
    skills: ["Organization", "Communication"],
    urgency: "Low",
    date: ["2025-07-25", "2025-07-26"],
  },
  { id: 4,
    eventName: "Food Drive",
    description: "Food drive for community",
    location: "San Diego, CA",
    skills: ["Organization", "Communication"],
    urgency: "High",
    date: ["2025-07-25", "2025-07-26"],
  }

];

let volunteers = [
  {
    id: 1, 
    volunteerName: "Volunteer A (name)",
    city: "Houston",
    state: "TX",
    requiredSkills: ["Cleaning", "Organization"],
    date: ["2025-07-26"],
  },
  {
    id: 2, 
    volunteerName: "Volunteer B (name)",
    city: "San Diego",
    state: "CA",
    requiredSkills: ["Organization", "Teamwork"],
    date: ["2025-07-26", "2025-07-25"],
  },
  {
    id: 3,
    volunteerName: "Volunteer C (name)",
    city: "Chicago",
    state: "IL",
    requiredSkills: ["Communication","Event Planning", "Teamwork"],
    date: ["2025-07-19"],
  },
    ];

  //function to check matches with location and atleast one of the req. skills, and dates
function matchUserToEvents(volunteer, event) {
  const dateMatch = event.date.some(d => volunteer.date.includes(d));
  const skillMatch = event.skills.some(skill => 
    volunteer.requiredSkills.includes(skill));
  const fullLocation = `${volunteer.city}, ${volunteer.state}`;
  const locationMatch = event.location === fullLocation;
  
  return dateMatch && skillMatch && locationMatch;
} //returns events that match the users preferences

  /*function to check matches for all users, displays it in http://localhost:5000/api/matches/test-matches
  /this is for development and can be removed or used for admins later */
function getMatchesForAll(req, res) {
  const results = volunteers.map(volunteer => {
    const matchedEvents = events.filter(event => matchUserToEvents(volunteer, event));
    return {
        volunteer: volunteer.volunteerName,
        matches: matchedEvents
    }; //returns all matches for all users based on their profile
  });

  res.json(results);
};

module.exports = { 
  matchUserToEvents,
  getMatchesForAll
};
