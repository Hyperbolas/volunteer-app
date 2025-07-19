import "./VolunteerParticipationHistory.css";
import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/AdminNavBar";

function VolunteerParticipationHistory() {
  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/history/any") 
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch history");
        return res.json();
      })
      .then((data) => setHistories(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <AdminNavBar />
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
            {histories.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.volunteerName}</td>
                <td>{entry.eventName}</td>
                <td>{entry.requiredSkills.join(", ")}</td>
                <td>{entry.date}</td>
                <td>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VolunteerParticipationHistory;
