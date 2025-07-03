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
        <Link to="/user/UserDashboard">User Dashboard</Link> <br></br>

        {/*Logout Button */}
        {user && (
        <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
          Logout
        </button>
        )}

        {/*All user types can view these two*/}
        {!user && (
        <>
          <Link to="/login" style={{ marginLeft: "1rem" }}>Login</Link>
          <Link to="/registration" style={{ marginLeft: "1rem" }}>Register</Link>
        </>
      )}
    </nav>
    );
};


export default NavBar;


