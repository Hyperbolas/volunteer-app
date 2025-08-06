import React, { useEffect, useState } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import { useNavigate } from 'react-router-dom';
import "./AdminViewEvents.css"
const BASE_URL = 'http://localhost:5000/api/eventRoute';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        console.error('Expected array but got:', data);
        setEvents([]); //prevent .map from crashing
      }
    })
    .catch((err) => console.error('Error fetching events:', err));
}, []);


const handleStatus = async (eventId, newStatus) => {
  try {
    const response = await fetch(`${BASE_URL}/${eventId}/status`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ status: newStatus}),
    });

    if (!response.ok) throw new Error('Failed to update status');

    const updatedEvents = events.map((event) =>
      event.id === eventId ? {...event, status: newStatus} : event);

    setEvents(updatedEvents);

    } catch(error) {
      console.error('Error updating status', error)
    }
  };

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
            <th>Status</th>
          </thead>
          
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td> {event.eventname} </td>
                <td>{event.description}</td>
                <td> {event.location} </td>
                <td> {event.skills.join(", ")} </td>
                <td> {event.urgency} </td>
                <td> {event.date} </td>
                <td className="status-box"> {event.status}
                <select
                  value = {event.status || ''}
                  onChange={(e) => handleStatus(event.id,e.target.value)}
                >
                  <option value="">Select</option>
                  <option value={"Pending"}>Pending</option>
                  <option value={"Active"}>Active</option>
                  <option value={"Completed"}>Completed</option>
                </select>
                </td>
              </tr> 
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewEvents;