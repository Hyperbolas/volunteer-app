import React from "react";
import AdminNavBar from "../../components/AdminNavBar";
import { useNavigate } from 'react-router-dom';
import "./AdminViewEvents.css"

const dummyEvents = [
  {
    id: 1,
    name: "Tree Planting",
    description:"Tree Planting for a local school",
    location: "Community Park",
    skills: ["Gardening", "Teamwork"],
    urgency: "High",
    date: "2025-07-20",
  },
  {
    id: 2,
    name: "Beach Cleanup",
    description:"Beach cleaning for a turtle reserve",
    location: "Sunset Beach",
    skills: ["Physical Work"],
    urgency: "Medium",
    date: "2025-07-22"
  },
  {
    id: 3,
    name: "Food Drive",
    description:"Food drive for the elderly",
    location: "City Center",
    skills: ["Organization", "Communication"],
    urgency: "Low",
    date: "2025-07-25",
  }
];



const ViewEvents = () => {
  const events = dummyEvents;
  const navigate = useNavigate();

  return (
    <div>
    <AdminNavBar/>
    <div className="events-container">
      <div className="events-header-container">
        <h2 className="events-header" >Event Viewer</h2>
        <button onClick={() => navigate('/admin/AdminCreateEvent')}>
            Create Event
        </button>
      </div>
      <table className="history-table">
        <thead>
          <th>Event Name</th>
          <th>Description</th>
          <th>Location</th>
          <th>Skills</th>
          <th>Urgency</th>
          <th>Date</th>
        </thead>
        
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td> {event.name} </td>
              <td>{event.description}</td>
              <td> {event.location} </td>
              <td> {event.skills.join(", ")} </td>
              <td> {event.urgency} </td>
              <td> {event.date} </td>
            </tr> 
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ViewEvents;