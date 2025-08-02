import React from "react";
import {Link, useNavigate} from "react-router-dom"
import './NavBar.css'

const NavBar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("registeredUser");
        navigate("/");  //navigate to homepage
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/">Homepage</Link>
                <Link to="/admin/AdminDashboard">Admin Dashboard</Link>
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