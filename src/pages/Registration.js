import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css'
//references chatgpt, https://www.w3schools.com/css/css_dimension.asp

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer");
  const [isRegistered, setIsRegistered] = useState(false); // NEW state

  const handleRegister = (e) => {
    e.preventDefault();

    const user = { email, password, role };
    localStorage.setItem("registeredUser", JSON.stringify(user));

    alert("Registered successfully! You can now log in.");
    setIsRegistered(true); // show first time login button
  };

  const handleFirstLogin = () => {
    const user = JSON.parse(localStorage.getItem("registeredUser"));
    if (user.role=="admin"){
      navigate("/admin/AdminDashboard")
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

      {/* first time login button appears only when registration is successful */}
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
