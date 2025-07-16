import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // adjust path if needed
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Store role locally since no DB
      localStorage.setItem("userRole", role);

      alert("Registered successfully! You can now log in.");
      setIsRegistered(true);
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  const handleFirstLogin = () => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole === "admin") {
      navigate("/admin/AdminDashboard");
    } else {
      navigate("/user/UserProfileForm");
    }
  };

  return (
    <div className='auth-container'>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />

        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <br />

        <button type="submit">Register</button>
      </form>

      {isRegistered && (
        <>
          <br />
          <button onClick={handleFirstLogin}>First-time Login</button>
        </>
      )}
    </div>
  );
};

export default Register;
