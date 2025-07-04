import React, { useEffect, useState } from 'react';
import UserNavBar from "../../components/UserNavBar";

const UserMatchedEvents = () => {
  const [matchedEvents, setMatchedEvents] = useState([]);

  // Simulated fetch - replace with API call later
  useEffect(() => {
    const dummyEvents = [
      {
        id: 1,
        name: "Community Park Cleanup",
        date: "2025-07-10",
        location: "Lincoln Park",
        skills: ["Teamwork", "Cleaning"],
        status: "Confirmed",
      },
      {
        id: 2,
        name: "Food Distribution",
        date: "2025-07-12",
        location: "Downtown Food Bank",
        skills: ["Organization", "Communication"],
        status: "Pending",
      },
    ];

    setMatchedEvents(dummyEvents);
  }, []);

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
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Date</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Location</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Skills</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {matchedEvents.map((event) => (
              <tr key={event.id}>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{event.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{event.date}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{event.location}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                  {event.skills.join(", ")}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{event.status}</td>
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
