import React, { useState, useEffect } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // dummy notifications for display only
  useEffect(() => {
    const dummyNotifications = [
      {
        id: 1,
        message: 'You’ve been matched to the Beach Cleanup event!',
        date: '2025-07-02',
      },
      {
        id: 2,
        message: 'Reminder: “Hermann Park Dog Walking with Houston Humane” starts tomorrow at 9 AM.',
        date: '2025-07-04',
      },
      {
        id: 3,
        message: 'Event Canceled: Squirrel Feeding at UH',
        date: '2025-07-05',
      },
    ];

    setNotifications(dummyNotifications);
  }, []);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications at this time.</p>
      ) : (
        <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
          {notifications.map((note) => (
            <li
              key={note.id}
              style={{
                backgroundColor: '#fff',
                marginBottom: '15px',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <p style={{ margin: 0 }}>{note.message}</p>
              <small style={{ color: '#777' }}>{note.date}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
