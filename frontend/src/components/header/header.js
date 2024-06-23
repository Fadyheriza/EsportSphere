import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="App-header text-center">
      <h1>
        <Link to="/" className="text-white text-decoration-none">EsportSphere</Link>
      </h1>
    </header>
  );
};

export default Header;