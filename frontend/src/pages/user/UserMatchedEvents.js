import React, { useEffect, useState } from 'react';
import UserNavBar from "../../components/UserNavBar";

const UserMatchedEvents = () => {
  const userId = localStorage.getItem('userId');
  const [matchedEvents, setMatchedEvents] = useState([]);

  useEffect(() => {
  if (!userId) return;

  fetch(`http://localhost:5000/api/matches/users/${userId}/matched-events`)
    .then((res) => res.json())
    .then((data) => {
      setMatchedEvents(data[0]?.matches || [])
      console.log("Fetched matched events:", data);})
    .catch((err) => console.error('Error fetching matches:', err));
}, [userId]);


  const handleAttendanceChange = async (eventId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/matches/users/${userId}/events/${eventId}/status`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ status: newStatus}),
    });

    if (!response.ok) throw new Error('Failed to update status');

    const updatedEvents = matchedEvents.map((event) =>
      event.id === eventId ? { ...event, status: newStatus } : event
    );
    setMatchedEvents(updatedEvents);

    } catch(error) {
      console.error('Error updating status', error)
    }
  };

  return (
    <div className='navigation-container'>
    <UserNavBar/>
    <div style={{ padding: '40px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2>Your Matched Events</h2>

      {matchedEvents.length === 0 ? (
        <p>You have no matched events yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#ddd' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Event Name</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Description</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Dates</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Location</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Skills</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Urgency</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {matchedEvents.map((event) => (
              <tr key={event.id}>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{event.eventname}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{event.description}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{event.date.join(", ")}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{event.location}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{event.skills.join(", ")}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{event.urgency}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{event.status}
                  <select
                  value = {event.userStatus}
                  onChange={(e) => handleAttendanceChange(event.id,e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value={"Attending"}>Attending</option>
                    <option value={"Attended"}>Attended</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default UserMatchedEvents;
