import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainContent = () => {
  // State to store ongoing matches
  const [ongoingMatches, setOngoingMatches] = useState([]);
  // State to store game information
  const [gameInfo, setGameInfo] = useState({});

  // Function to fetch ongoing matches from API
  const fetchOngoingMatches = async () => {
    try {
      const response = await axios.get('/api/ongoing-matches'); // Adjust the URL according to your API endpoint
      setOngoingMatches(response.data);
    } catch (error) {
      console.error('Error fetching ongoing matches:', error);
    }
  };

  // Function to fetch game information from API
  const fetchGameInfo = async () => {
    try {
      const response = await axios.get('/api/game-info'); // Adjust the URL according to your API endpoint
      setGameInfo(response.data);
    } catch (error) {
      console.error('Error fetching game info:', error);
    }
  };

  // Fetch ongoing matches and game info when component mounts
  useEffect(() => {
    fetchOngoingMatches();
    fetchGameInfo();
  }, []);

  return (
    <main className="container my-5">
      <div className="row">
        <div className="col-md-6">
          {/* Left Box */}
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                {/* Display game title from API */}
                <h2 className="me-auto">{gameInfo.title}</h2>
              </div>
              <hr />
              {/* Display game description from API */}
              <p>{gameInfo.description}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          {/* Right Box */}
          <div className="card">
            <div className="card-body">
              <h2>Ongoing Matches</h2>
              {/* Display ongoing matches from API */}
              <ul>
                {ongoingMatches.map(match => (
                  <li key={match.id}>{match.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;