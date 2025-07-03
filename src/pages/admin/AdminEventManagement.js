import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import AdminNavBar from "../../components/AdminNavBar";

const AdminEventManagement = () => {
  const [formData, setFormData] = useState({
      eventName: "",
      description: "",
      location: "",
      skills: [],
      urgency: "",
      date: "",
    });

    const skillOptions = ["Html", "JavaScript", "React", "CSS"]
    const urgency = ["Low", "Medium", "High"]

    const handleChange = (e) => {

    }
  return (
    <div className="admin-container">
      <AdminNavBar />
      <div>
        <div>
          <h1>Manage Events</h1> 
        </div>
      </div>
      </div>
  )
  };


export default AdminEventManagement;