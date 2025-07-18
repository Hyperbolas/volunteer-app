
let events = [
  {
    id: 1,
    eventName: "Tree Planting",
    description: "Tree Planting for a local park",
    location: "Community Park",
    skills: ["Gardening", "Teamwork"],
    urgency: "High",
    date: "2025-07-20",
  },
  {
    id: 2,
    eventName: "Beach Cleanup",
    description: "Beach cleaning for a turtle reserve",
    location: "Sunset Beach",
    skills: ["Physical Work"],
    urgency: "Medium",
    date: "2025-07-15",
  },
  {
    id: 3,
    eventName: "Food Drive",
    description: "Food drive for the elderly",
    location: "City Center",
    skills: ["Organization", "Communication"],
    urgency: "Low",
    date: "2025-07-25",
  }
];

let sampleParticipationData = [
  {
    volunteerName: "Volunteer A (name)",
    eventName: "Warehouse Cleaning",
    requiredSkills: ["Cleaning"],
    date: "05-10-2025",
    status: "Completed",
  },
  {
    volunteerName: "Volunteer B (name)",
    eventName: "Shelter Kitchen Shift",
    requiredSkills: ["Cooking", "Teamwork"],
    date: "06-22-2025",
    status: "Completed",
  },
  {
    volunteerName: "Volunteer C (name)",
    eventName: "Community Meeting",
    requiredSkills: ["Communication","Event Planning"],
    date: "07-09-2025",
    status: "Pending Acceptance",
  },
  {
    volunteerName: "Volunteer D (name)",
    eventName: "Cleaning Shift",
    requiredSkills: [ "Teamwork"],
    date: "08-22-2025",
    status: "Assigned",
  },
  {
    volunteerName: "Volunteer E (name)",
    eventName: "Clinic Shift",
    requiredSkills: ["First Aid", "Communication"],
    date: "09-07-2025",
    status: "Assigned",
  },
  {
    volunteerName: "Volunteer F (name)",
    eventName: "Warehouse Cleaning",
    requiredSkills: ["Cleaning", "Teamwork"],
    date: "10-20-2025",
    status: "Pending Acceptance",
  },
  {
    volunteerName: "Volunteer G (name)",
    eventName: "Shelter Kitchen Shift",
    requiredSkills: ["Cooking", "Teamwork"],
    date: "11-11-2025",
    status: "Assigned",
  },
  {
    volunteerName: "Volunteer H (name)",
    eventName: "Management Meeting",
    requiredSkills: ["Leadership", "Teamwork", "Organization"],
    date: "11-17-2025",
    status: "Assigned",
  }
    ];

const getEvents = (req, res) => {
  res.json(events);
};

const createEvent = (req, res) => {
  const { eventName, description, location, skills, urgency, date } = req.body;

  if (!eventName || !description || !location || !skills || !urgency || !date ) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newEvent = {
    id: events.length + 1,
    eventName,
    description,
    location,
    skills,
    urgency,
    date,
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
};

const getParticipationHistory = (req, res) => {
  res.json(sampleParticipationData);
};

module.exports = {
  getEvents,
  createEvent,
  getParticipationHistory,
};