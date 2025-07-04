import React, { useState, useEffect } from 'react';
import AdminNavBar from "../../components/AdminNavBar";

const VolunteerMatchingForm = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [message, setMessage] = useState('');

  // Dummy data
  useEffect(() => {
    setVolunteers([
      { id: 'v1', name: 'Alice', skills: ['Cleaning', 'Teamwork'] },
      { id: 'v2', name: 'Bob', skills: ['Cooking', 'Organization'] },
      { id: 'v3', name: 'Charlie', skills: ['Communication', 'Event Setup'] },
    ]);

    setEvents([
      { id: 'e1', name: 'Beach Cleanup', requiredSkills: ['Cleaning'] },
      { id: 'e2', name: 'Food Bank Shift', requiredSkills: ['Cooking', 'Teamwork'] },
      { id: 'e3', name: 'Community Meeting', requiredSkills: ['Communication'] },
    ]);
  }, []);

  // when a volunteer is selected, only shows events that match their skills
  const handleVolunteerSelect = (e) => {
    const volunteerId = e.target.value;
    setSelectedVolunteer(volunteerId);
    const volunteer = volunteers.find((v) => v.id === volunteerId);
    if (volunteer) {
      const matches = events.filter((event) =>
        event.requiredSkills.some((skill) => volunteer.skills.includes(skill))
      );
      setFilteredEvents(matches);
    } else {
      setFilteredEvents([]);
    }
    setSelectedEvent('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedVolunteer || !selectedEvent) {
      setMessage("Please select both volunteer and event");
      return;
    }
    const volunteerName = volunteers.find((v) => v.id === selectedVolunteer)?.name;
    const eventName = events.find((e) => e.id === selectedEvent)?.name;
    setMessage(`${volunteerName} successfully matched to ${eventName}`);
    setSelectedEvent('');
    setSelectedVolunteer('');
    setFilteredEvents([]);
  };

  return (
    <div className="admin-container">
      <AdminNavBar />
      <div style={{ padding: '30px', maxWidth: '500px', margin: 'auto' }}>
        <h2>Volunteer Matching Form</h2>
        <form onSubmit={handleSubmit}>
          <label>Select Volunteer:</label>
          <select value={selectedVolunteer} onChange={handleVolunteerSelect} required>
            <option value="">-- Choose Volunteer --</option>
            {volunteers.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.skills.join(", ")})
              </option>
            ))}
          </select>

          <br /><br />

          <label>Select Matching Event:</label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            required
            disabled={filteredEvents.length === 0}
          >
            <option value="">-- Choose Event --</option>
            {filteredEvents.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} (Needs: {e.requiredSkills.join(", ")})
              </option>
            ))}
          </select>

          <br /><br />
          <button type="submit">Assign Volunteer</button>
          {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default VolunteerMatchingForm;
