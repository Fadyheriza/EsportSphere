import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const Login = () => {
    const { setToken } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { username, password });
            setToken(response.data.access_token);
            setMessage('Login successful!');
        } catch (error) {
            console.error('Login failed:', error);
            setMessage('Login failed!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Login;

