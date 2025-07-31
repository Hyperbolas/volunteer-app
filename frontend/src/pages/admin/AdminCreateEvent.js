import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import AdminNavBar from "../../components/AdminNavBar";
import DatePicker from "react-multi-date-picker"
import "./AdminCreateEvent.css"

const AdminEventManagement = ( {onSubmit} ) => {
  const [formData, setForm] = useState({
      eventname: "",
      description: "",
      location: "",
      skills: [],
      urgency: "",
      date: [],
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.eventname.trim()) newErrors.eventname = "Event name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (formData.skills.length === 0) newErrors.skills = "Select at least one skill";
    if (!formData.urgency) newErrors.urgency = "Urgency is required";
    if (!formData.date || formData.date.length === 0) newErrors.date = "Please select at least one date";

    return newErrors;
  };

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
      } else {
        setForm({ ...formData, [name]: value });
      }
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      //validate form
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      //make api request if form is valid
      try {
        const response = await fetch('http://localhost:5000/api/eventRoute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          const err = await response.json();
          alert(`Error: ${err.error}`);
          return;
          }

        onSubmit(formData);

        //reset validation errors
        setErrors({});

        //alert and redirect
        navigate("/admin/AdminViewEvents"); 
        alert("Thank you for your submission, redirecting to Event Viewer")

      } catch(error) {
        console.error('Error creating event:', error)
      }
    }

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
              <label>Event Name*</label>
              <input
                id="eventname"
                name="eventname"
                className= "form-control"
                value={formData.eventname}
                onChange={handleChange}
                maxLength={100}
                type="text"
                />
                {errors.eventname && <p className="error">{errors.eventname}</p>}
            </div>

            {/* Description Text Area, req */}
            <div className="form-group">
              <label>Description*</label>
                <input
                id= "description"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                type="text"
                />
                {errors.description && <p className="error">{errors.description}</p>}
            </div>

            {/* Location Text Area, req */}
            <div className="form-group">
              <label>Location*</label>
                <input
                id="location"
                name="location"
                className="form-control"
                value={formData.location}
                onChange={handleChange}
                type="text"
                />
                {errors.location && <p className="error">{errors.location}</p>}
            </div>

            {/* Skills Multi-select Drop Down, req */}
            <div className="form-group">
              <label>Required Skills*</label>
                <select multiple
                  id="skills"
                  name="skills"
                  className="form-control-skills"
                  value={formData.skills}
                  onChange={handleChange}
                >
                  <option value="Cleaning">Cleaning</option>
                  <option value="Cooking">Cooking</option>
                  <option value="Communication">Communication</option>
                  <option value="Event Planning">Event Planning</option>
                  <option value="Teamwork">Teamwork</option>
                  <option value="Organization">Organization</option>
                  <option value="Leadership">Leadership</option>
                  <option value="First Aid">First Aid</option>
                  </select>
                  {errors.skills && <p className="error">{errors.skills}</p>}
            </div>

            {/*Urgency Drop down, req */}
            <div className="form-group">
              <label>Urgency*</label>
                <select
                  id="urgency"
                  name="urgency"
                  className="form-control"
                  value={formData.urgency}
                  type="text"
                  onChange={handleChange}
                >
                  <option value=""disabled hidden>Select Urgency</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {errors.urgency && <p className="error">{errors.urgency}</p>}
            </div>

            {/*Event Date, Calendar, date picker */}
            <div className="form-group">
              <label>Event Date*</label>
                <DatePicker multiple
                value={formData.date}
                onChange={(dates) => {
                  const formattedDates = dates.map((dates) => dates.format("YYYY-MM-DD, "));
                  setForm({ ...formData, date: formattedDates });
                }}
                format="YYYY-MM-DD"
                inputClass="form-control" 
                className="blue" 
                calendarPosition="bottom-left"
                placeholder="Select availability dates"
              />
              {errors.date && <p className="error">{errors.date}</p>}
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