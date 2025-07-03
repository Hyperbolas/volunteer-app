import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'

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

    //temporary role logic, replace with real authentication in the backend
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

        <div className="form-group">
          <label>Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </label>
        </div>
        

        <div className="form-group">
          <label>Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </label>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;