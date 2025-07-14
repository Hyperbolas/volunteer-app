import "./VolunteerParticipationHistory.css";
//references chatgpt, https://www.youtube.com/watch?v=SurVt_rqOQM

import React from "react";
import AdminNavBar from "../../components/AdminNavBar";

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

  return (
    <div>
      <AdminNavBar/>
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
    </div>
  );
}


export default VolunteerParticipationHistory;
