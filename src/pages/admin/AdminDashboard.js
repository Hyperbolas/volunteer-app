import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from "../../components/AdminNavBar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
      <div className="admin-container">
      <AdminNavBar />
      <div className="admin-dashboard">
        <h1 className="admin-heading">Admin Dashboard</h1>
        <div className="admin-button-group">
          <button onClick={() => navigate('/admin/AdminViewEvents')}>
            Manage Events
          </button>
          <button onClick={() => navigate('/admin/VolunteerMatchingForm')}>
            Volunteer Matching
          </button>
          <button onClick={() => navigate('/admin/VolunteerParticipationHistory')}>
            View Volunteer History
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
