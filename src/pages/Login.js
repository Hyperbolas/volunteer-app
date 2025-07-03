import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import './login.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Logged in', username, password);
    }

return(
    
    <div className='login-container'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username"></input>
            <label for="password">Password:</label>
            <input type="text"></input>
        </form>
        {/* Temporary login buttons for flow testing, will be replaced by a 
        single login button when implemented */}
      <br />
      <button onClick={() => navigate('/user/UserDashboard')}>
        Volunteer Login
      </button>
      <button onClick={() => navigate('/admin/AdminDashboard')}>
        Admin Login
      </button>
    </div>
);
}
export default Login;