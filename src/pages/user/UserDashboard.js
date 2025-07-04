import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
//references chatgpt, https://www.w3schools.com/css/css_padding.asp

const VolunteerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Volunteer Dashboard</h1>
      <p>Welcome, Volunteer!</p>

      <div className="dashboard-buttons">
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
