import "./VolunteerParticipationHistory.css";
//references chatgpt, https://www.youtube.com/watch?v=SurVt_rqOQM

import React from "react";
import AdminNavBar from "../../components/AdminNavBar";
import { useEffect, useState } from "react";

  function VolunteerParticipationHistory() {
    const [sampleParticipationData, setParticipation] = useState([]);

    useEffect(() => {
      fetch('http://localhost:5000/api/eventRoute/participation')
        .then((res) => res.json())
        .then((data) => setParticipation(data))
        .catch((err) => console.error('Error fetching events:', err));

    }, []);
  

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
};


export default VolunteerParticipationHistory;
