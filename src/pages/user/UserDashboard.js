import React from 'react';
import { useNavigate } from 'react-router-dom';

const VolunteerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h1>Volunteer Dashboard</h1>
      <p>Welcome, Volunteer!</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "30px", maxWidth: "300px" }}>
        <button onClick={() => navigate("/user/UserMatchedEvents")}>
          View Matched Events
        </button>

        <button onClick={() => navigate("/user/UserNotifications")}>
          View Notifications
        </button>

        <button onClick={() => navigate("/user/UserProfileForm")}>
          Update Profile / Availability
        </button>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
