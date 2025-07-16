import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const fakeUsers = [
    {
      email: "admin@example.com",
      password: "admin123",
      role: "admin"
    },
    {
      email: "user@example.com",
      password: "user123",
      role: "user"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const matchedUser = fakeUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      if (matchedUser.role === "admin") {
        navigate("/admin/AdminDashboard");
      } else {
        navigate("/user/UserDashboard");
      }
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Login</button>
      </form>

      <div style={{ marginTop: '20px', fontSize: '14px' }}>
        <strong>For dev only:</strong><br />
        <u>Admin</u><br />
        Email: admin@example.com<br />
        Password: admin123<br /><br />
        <u>Volunteer</u><br />
        Email: user@example.com<br />
        Password: user123
      </div>
    </div>
  );
}

export default Login;
