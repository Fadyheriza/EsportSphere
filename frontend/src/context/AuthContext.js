import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token'),
        user: null,
        message: '',
    });

    useEffect(() => {
        if (authState.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
            // Optionally, you can fetch user data here
            // axios.get('/api/user').then(response => setAuthState({ ...authState, user: response.data }));
        }
    }, [authState.token]);

    const setToken = (token) => {
        localStorage.setItem('token', token);
        setAuthState({ ...authState, token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({ token: null, user: null, message: 'You have been logged out!' });
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ authState, setToken, logout }}>
            {children}
            {authState.message && <p>{authState.message}</p>}
        </AuthContext.Provider>
    );
};

export default AuthContext;
