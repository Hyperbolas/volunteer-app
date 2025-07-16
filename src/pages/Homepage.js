import React from "react";
import { useNavigate } from "react-router-dom";
import './HomePage.css';
//references ChatGPT, https://www.w3schools.com/css/default.asp

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Volunteer App - Group 18</h1>
      <div className="button-group">
        <button className="home-button" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="home-button" onClick={() => navigate("/registration")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default HomePage;
