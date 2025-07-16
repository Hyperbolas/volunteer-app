import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Adjust path if needed
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // TEMP: Determine role based on email (no DB yet)
      if (email === "admin@example.com") {
        navigate("/admin/AdminDashboard");
      } else {
        navigate("/user/UserDashboard");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
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
