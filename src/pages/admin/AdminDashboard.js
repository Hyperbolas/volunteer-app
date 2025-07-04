import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from "../../components/AdminNavBar";
//references chatgpt, https://www.w3schools.com/css/css_colors.asp

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (

      <div className="admin-container">
      <AdminNavBar />
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <div className="button-group">
          <button onClick={() => navigate('/admin/AdminEventManagement')}>
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
