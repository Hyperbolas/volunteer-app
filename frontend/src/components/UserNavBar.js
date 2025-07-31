import React from "react";
import {Link, useNavigate} from "react-router-dom"
import './NavBar.css'

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("registeredUser");
        navigate("/"); //navigate to homepage
    };

    return (
    <nav className="navbar">
        <div className="nav-left">
          <Link to="/">Homepage</Link> <br></br>
          <Link to="/user/UserDashboard">User Dashboard</Link> <br/>
        </div>

        <div className="nav-right">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
    </nav>
    );
};


export default NavBar;


