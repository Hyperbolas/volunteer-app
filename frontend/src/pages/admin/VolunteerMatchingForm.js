// export default VolunteerMatchingForm;
import React, { useState, useEffect } from 'react';
import AdminNavBar from "../../components/AdminNavBar";
import "./VolunteerMatchingForm.css";


const VolunteerMatchingForm = () => {
  const userId = localStorage.getItem('userId');
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [matchedEvents, setMatchedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [message, setMessage] = useState('');

  //fetch all volunteers (real API call or dummy for now)
  useEffect(() => {
    const fetchVolunteers = async () => {
      const res = await fetch(`http://localhost:5000/api/matches/users/`); 
      const data = await res.json();
      console.log('fetched data:', data);
      setVolunteers(data); //assumes array of { user_id, full_name, skills }
    };

    fetchVolunteers();
  }, []);

  //when volunteer is selected, fetch their matched events
  const handleVolunteerSelect = async (e) => {
    const userId = e.target.value;
    setSelectedVolunteer(userId);
    setMessage('');
    setSelectedEvent('');

    if (!userId) {
      setMatchedEvents([]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/matches/users/${userId}/matched-events`);
      const data = await res.json();
      setMatchedEvents(data[0]?.matches || []);
      console.log("Fetched matched events:", data);
    } catch (err) {
      console.error("Failed to fetch matched events", err);
      setMatchedEvents([]);
    }
  };

  // When the admin assigns the volunteer
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedVolunteer || !selectedEvent) {
      setMessage("Please select both volunteer and event");
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/matches/users/${selectedVolunteer}/events/${selectedEvent}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Attending" }),
      });

      const volunteername = volunteers.find((v) => v.user_id === parseInt(selectedVolunteer))?.full_name;
      const eventname = matchedEvents.find((e) => e.id === parseInt(selectedEvent))?.eventname;

      setMessage(`${volunteername} successfully matched to ${eventname}`);
      setSelectedEvent('');
    } catch (err) {
      console.error("Failed to update status", err);
      setMessage("Error assigning volunteer to event");
    }
  };

  return (
    <div className="admin-container">
      <AdminNavBar />
      <div className='form-wrapper'>
        <h2 className='form-title'>Volunteer Matching Form</h2>
        <form onSubmit={handleSubmit} className='matching-form'>
          <label>Select Volunteer:</label>
          <select value={selectedVolunteer} onChange={handleVolunteerSelect} required>
            <option value="">-- Choose Volunteer --</option>
            {volunteers.map((v) => (
              <option key={v.user_id} value={v.user_id}>
                {v.full_name}
              </option>
            ))}
          </select>

          <br />

          <label>Select Matching Event:</label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            required
            disabled={matchedEvents.length === 0}
          >
            <option value="">-- Choose Event --</option>
            {matchedEvents.map((e) => (
              <option key={e.id} value={e.id}>
                {e.eventname} (Needs: {e.skills?.join(", ")})
              </option>
            ))}
          </select>

          <button type="submit">Assign Volunteer</button>
          {message && <p className='success-message'>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default VolunteerMatchingForm;

