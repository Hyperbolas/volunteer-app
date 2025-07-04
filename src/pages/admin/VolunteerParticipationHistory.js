import "./VolunteerParticipationHistory.css";
//references chatgpt, https://www.youtube.com/watch?v=SurVt_rqOQM

import React from "react";

function VolunteerParticipationHistory() {
  const sampleParticipationData = [
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
      date: "09-22-2025",
      status: "Assigned",
    },
    {
      volunteerName: "Volunteer C (name)",
      eventName: "Community Meeting",
      requiredSkills: ["Communication"],
      date: "01-11-2025",
      status: "Pending Acceptance",
    },
  ];

  return (
    <div className="history-container">
      <h2 className="history-heading">Volunteer Participation History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>Volunteer Name</th>
            <th>Event Name</th>
            <th>Required Skills</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleParticipationData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.volunteerName}</td>
              <td>{entry.eventName}</td>
              <td>{entry.requiredSkills.join(", ")}</td>
              {/* For multiple skills*/}
              <td>{entry.date}</td>
              <td>{entry.status}</td>
            </tr>
          ))}
          {/* using map to loop through each object in the array*/}
        </tbody>
      </table>
    </div>
  );
}

export default VolunteerParticipationHistory;
