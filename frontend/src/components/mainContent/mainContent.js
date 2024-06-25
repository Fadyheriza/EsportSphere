// src/components/MainContent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainContent.css';
import cs2Logo from '../../assets/images/cs2-logo.png';

const MainContent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/teams');
  };

  return (
    <main className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card h-100" onClick={handleClick}>
            <div className="card-body d-flex align-items-center">
              <img src={cs2Logo} className="csgo-logo" alt="CSGO cover" />
              <div>
                <h3 className="card-title">CS 2</h3>
                <p className="card-text">
                  Counter-Strike 2 (CS2) is a multiplayer first-person shooter developed by Valve and Hidden Path Entertainment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
