import React, {useState} from "react";
// import { useNavigate } from 'react-router-dom';
import AdminNavBar from "../../components/AdminNavBar";
import DatePicker from "react-multi-date-picker"
import "./AdminEventManagement.css"

const AdminEventManagement = ({ onSubmit }) => {
  const [formData, setForm] = useState({
      eventName: "",
      description: "",
      location: "",
      skills: [],
      urgency: "",
      date: [],
    });

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
      setForm({ ...formData, [name]: value });
    }else {
      setForm({ ...formData, [name]: value });
    }
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name && 
      formData.description && 
      formData.location &&
      formData.skills.length > 0 && 
      formData.urgency && 
      formData.date
    ) {
      onSubmit(formData);
      setForm({
        name: "", 
        description: "", 
        location: "",
        skills: [], 
        urgency: "", 
        date: ""
      });
    } else {
      alert("Please fill in all required fields.");
    }

    };
  return (
    <div>
      <AdminNavBar />
    <div className="admin-event-page">
      <div className="admin-container">
      </div>

      <main className="form-wrapper">
        <h1 className="form-title">Manage Events</h1> 

        {/*Event Name 100 Chars, req*/}
        <form className="event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Name
            <input
              id="name"
              name="name"
              className= "form-control"
              onChange={handleChange}
              maxLength={100}
              required
              />
              </label>
          </div>

          {/* Description Text Area, req */}
          <div className="form-group">
            <label>Description
              <input
              id= "description"
              name="description"
              className="form-control"
              onChange={handleChange}
              required
              />
            </label>
          </div>

          {/* Location Text Area, req */}
          <div className="form-group">
            <label>Location
              <input
              id="location"
              name="location"
              className="form-control"
              onChange={handleChange}
              required
              />
            </label>
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
                <option value="JavaScript">JavaScript</option>
                <option value="CSS">CSS</option>
                <option value="Html">Html</option>
                <option value="React">React</option>
                </select>
          </div>

          {/*Urgency Drop down, req */}
          <div className="form-group">
            <label>Urgency
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
            </label>
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
  );
  };


export default AdminEventManagement;