import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import AdminNavBar from "../../components/AdminNavBar";
import DatePicker from "react-multi-date-picker"
import "./AdminCreateEvent.css"

const AdminEventManagement = ({ onSubmit }) => {
  const [formData, setForm] = useState({
      eventName: "",
      description: "",
      location: "",
      skills: [],
      urgency: "",
      date: "",
    });

    const navigate = useNavigate();

    // const [eventDate, setEventDate] = useState(new Date());

    const handleChange = (e) => {
    const { name, value, type, options} = e.target;
    if (type === "select-multiple") {
      const selectedOptions = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedOptions.push(options[i].value);
        }
      }
      setForm({ ...formData, [name]: selectedOptions });
    }else {
      setForm({ ...formData, [name]: value });
    }
  };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (
        formData.eventName && 
        formData.description && 
        formData.location &&
        formData.skills.length > 0 && 
        formData.urgency && 
        formData.date
      ){
        onSubmit(formData);
        setForm({
          eventName: "", 
          description: "", 
          location: "",
          skills: [], 
          urgency: "", 
          date: ""
        });
        navigate("/admin/AdminViewEvents"); 
        alert("Thank you for your submission, redirecting to Event Viewer")
      } else {
        alert("Please fill in all required fields.");
      }

    };
  return (
    <div>
      <AdminNavBar />
    <div className="admin-event-page">
      <div className="admin-container">
      <main className="form-wrapper">
        <h1 className="form-title">Create Event</h1> 

        {/*Event Name 100 Chars, req*/}
        <form className="event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Name</label>
            <input
              id="eventName"
              name="eventName"
              className= "form-control"
              onChange={handleChange}
              maxLength={100}
              required
              />
          </div>

          {/* Description Text Area, req */}
          <div className="form-group">
            <label>Description</label>
              <input
              id= "description"
              name="description"
              className="form-control"
              onChange={handleChange}
              required
              />
          </div>

          {/* Location Text Area, req */}
          <div className="form-group">
            <label>Location</label>
              <input
              id="location"
              name="location"
              className="form-control"
              onChange={handleChange}
              required
              />
          </div>

          {/* Skills Multi-select Drop Down, req */}
          <div className="form-group">
            <label>Required Skills</label>
              <select multiple
                id="skills"
                name="skills"
                className="form-control"
                value={formData.skills}
                onChange={handleChange}
                required
              >
                <option value="JavaScript">Cleaning</option>
                <option value="CSS">Marketing</option>
                <option value="Html">Teaching</option>
                <option value="React">Office Administration</option>
                </select>
          </div>

          {/*Urgency Drop down, req */}
          <div className="form-group">
            <label>Urgency </label>
              <select
                id="urgency"
                name="urgency"
                className="form-control"
                onChange={handleChange}
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
          </div>

          {/*Event Date, Calendar, date picker */}
          <div className="form-group">
            <label>Event Date</label>
              <DatePicker
              multiple
              value={formData.date}
              onChange={(dates) => {
                setForm({ ...formData, date: dates });
              }}
              format="YYYY-MM-DD"
              inputClass="form-control" 
              className="blue" 
              calendarPosition="bottom-left"
              placeholder="Select availability dates"
            />

          </div>
    <button type="submit" className="button">Submit</button>
      
    </form>
    </main>
    </div>
    </div>
    </div>

  );
  };


export default AdminEventManagement;