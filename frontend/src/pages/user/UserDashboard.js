import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBar from "../../components/UserNavBar";
import './UserDashboard.css'; // Make sure this import is included

const VolunteerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="navigation-container">
      <UserNavBar />
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
    </div>
  );
};

export default VolunteerDashboard;
