import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css';
//references chatgpt, old https://www.w3schools.com/css/css_dimension.asp

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer");
  const [isRegistered, setIsRegistered] = useState(false);

const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, role })
    });

    const data = await response.json();  

    if (response.ok && data.userId) {
      localStorage.setItem('userId', data.userId);      
      localStorage.setItem('userRole', data.role);     

      alert("Registered successfully! You can now log in.");
      setIsRegistered(true);
    } else {
      alert(data.error || "Registration failed.");
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
    console.error("Registration error:", error);
  }
};



  const handleFirstLogin = () => {
    if (role === "admin") {
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
