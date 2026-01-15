import React, { useState, useEffect } from 'react';
import UserNavBar from "../../components/UserNavBar";
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userEmail = "alice@example.com"; // replace with actual user's email, possibly from a logged-in state

  useEffect(() => {
    // Fetch notifications for the logged-in user
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/notifications?email=${userEmail}`);
        setNotifications(response.data);  // Set notifications to the state
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, [userEmail]);  // Trigger effect when userEmail changes (e.g., on login)

  return (
    <div className='navigation-container'>
      <UserNavBar />
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
                <small style={{ color: '#777' }}>{new Date(note.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
