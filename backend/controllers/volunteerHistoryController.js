// sample data
const sampleParticipationData = [
  {
    volunteerId: "1",
    volunteerName: "Alice Bobby",
    eventName: "Warehouse Cleaning",
    requiredSkills: ["Cleaning"],
    date: "05-10-2025",
    status: "Completed",
  },
  {
    volunteerId: "1",
    volunteerName: "Alice Bobby",
    eventName: "Shelter Kitchen Shift",
    requiredSkills: ["Cooking", "Teamwork"],
    date: "06-22-2025",
    status: "Completed",
  },
  {
    volunteerId: "2",
    volunteerName: "Bobby Lobby",
    eventName: "Community Meeting",
    requiredSkills: ["Communication", "Event Planning"],
    date: "07-09-2025",
    status: "Pending Acceptance",
  }
];

exports.getVolunteerHistory = (req, res) => {
  const userId = req.params.userId;
  const userHistory = sampleParticipationData.filter(item => item.volunteerId === userId);

  if (userHistory.length === 0) {
    return res.status(404).json({ message: "No history found for user" });
  }

  res.json(userHistory);
};
