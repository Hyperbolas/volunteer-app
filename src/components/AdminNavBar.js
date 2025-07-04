import React from "react";
import {Link, useNavigate} from "react-router-dom"

const NavBar = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("registeredUser"));

    const handleLogout = () => {
        localStorage.removeItem("registeredUser");
        navigate("/login");
    };

    return (
    <nav>
        <Link to="/">Homepage</Link> <br></br>

        {/*User type Navigation*/}
        
        <Link to="/admin/AdminDashboard">Admin Dashboard</Link> <br></br>
        

        {/*Logout Button */}
        
        <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
          Logout
        </button>
    

    </nav>
    );
};

export default NavBar;