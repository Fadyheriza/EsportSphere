import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const apiUrl = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    user: null,
    message: '',
  });

  useEffect(() => {
    if (authState.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
      fetchUserData();
    }
  }, [authState.token]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users/profile`);
      setAuthState((prevState) => ({ ...prevState, user: response.data }));
      console.log('User data fetched:', response.data);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  const setToken = (token) => {
    localStorage.setItem('token', token);
    setAuthState((prevState) => ({ ...prevState, token }));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchUserData();
  };

  const logout = (callback) => {
    localStorage.removeItem('token');
    setAuthState({ token: null, user: null, message: 'You have been logged out!' });
    delete axios.defaults.headers.common['Authorization'];
    if (callback) callback();
  };

  const clearMessage = () => {
    setAuthState((prevState) => ({ ...prevState, message: '' }));
  };

  return (
    <AuthContext.Provider value={{ authState, setToken, logout, clearMessage }}>
      {children}
      {authState.message && <p>{authState.message}</p>}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContext;
