import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <ul className="list-inline mb-2">
          <li className="list-inline-item">
            <Link className="text-white" to="/about">About</Link>
          </li>
          <li className="list-inline-item">|</li> {/* Beitragsstrich */}
          <li className="list-inline-item">
            <Link className="text-white" to="/contact">Contact</Link>
          </li>
        </ul>
        <p>&copy; 2024 EsportSphere. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
};

export default Footer;