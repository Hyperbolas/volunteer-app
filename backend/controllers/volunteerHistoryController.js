// Sample data, replace with DB
const sampleParticipationData = [
  {
    volunteerName: "Alice Bobby",
    eventName: "Warehouse Cleaning",
    requiredSkills: ["Cleaning"],
    date: "05-10-2025",
    status: "Completed",
  },
  {
    volunteerName: "Bobby Lobby",
    eventName: "Shelter Kitchen Shift",
    requiredSkills: ["Cooking", "Teamwork"],
    date: "06-22-2025",
    status: "Completed",
  },
  {
    volunteerName: "Lobby Hotelier",
    eventName: "Community Meeting",
    requiredSkills: ["Communication", "Event Planning"],
    date: "07-09-2025",
    status: "Pending Acceptance",
  },
  {
    volunteerName: "Hotelier Sommelier",
    eventName: "Cleaning Shift",
    requiredSkills: ["Teamwork"],
    date: "08-22-2025",
    status: "Assigned",
  },
  {
    volunteerName: "Big Dawg",
    eventName: "Clinic Shift",
    requiredSkills: ["First Aid", "Communication"],
    date: "09-07-2025",
    status: "Assigned",
  },
  {
    volunteerName: "Bad Cat",
    eventName: "Warehouse Cleaning",
    requiredSkills: ["Cleaning", "Teamwork"],
    date: "10-20-2025",
    status: "Pending Acceptance",
  },
  {
    volunteerName: "Good Giraffe",
    eventName: "Shelter Kitchen Shift",
    requiredSkills: ["Cooking", "Teamwork"],
    date: "11-11-2025",
    status: "Assigned",
  },
  {
    volunteerName: "Small Giraffe",
    eventName: "Management Meeting",
    requiredSkills: ["Leadership", "Teamwork", "Organization"],
    date: "11-17-2025",
    status: "Assigned",
  }
];

exports.getVolunteerHistory = (req, res) => {
  const userId = req.params.userId;
  res.json(sampleParticipationData);
};
