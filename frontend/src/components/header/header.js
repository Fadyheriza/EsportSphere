import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Header = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => navigate('/login')); // Übergebe den Callback zur Navigation
  };

  return (
    <header className="App-header text-center">
      <h1>
        <Link to="/" className="text-white text-decoration-none">EsportSphere</Link>
      </h1>
      <nav>
        <Link to="/teams" className="text-white text-decoration-none">Teams</Link>
        {' | '}
        <Link to="/games" className="text-white text-decoration-none">Games</Link>
        {' | '}
        {authState.token ? (
          <>
            <span className="text-white">Welcome, {authState.user ? authState.user.username : 'User'}</span>
            {' | '}
            <Link to="/profile" className="text-white text-decoration-none">Profile</Link>
            {' | '}
            <button onClick={handleLogout} className="text-white text-decoration-none" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white text-decoration-none">Login</Link>
            {' | '}
            <Link to="/register" className="text-white text-decoration-none">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
