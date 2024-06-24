import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/users/register', { username, password });
            setMessage('Registration successful!');
        } catch (error) {
            console.error('Registration failed:', error);
            setMessage('Registration failed!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Register;
