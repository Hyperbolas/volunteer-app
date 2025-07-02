import React, { useState } from 'react';
// import './login.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
    </div>
);
}
export default Login;