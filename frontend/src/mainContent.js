import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainContent.css'; // Make sure to create this CSS file

const MainContent = () => {
  const [seriesState, setSeriesState] = useState(null);
  const seriesId = '1'; // Replace with your actual series ID for testing

  const fetchSeriesState = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/series-state/${seriesId}`);
      setSeriesState(response.data);
    } catch (error) {
      console.error('Error fetching series state:', error);
    }
  };

  useEffect(() => {
    fetchSeriesState();
  }, []);

  return (
    <main className="container my-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h2>CSGO Series Events</h2>
              {seriesState ? (
                <div>
                  <h3>Series Info</h3>
                  <p><strong>Format:</strong> {seriesState.format}</p>
                  <p><strong>Started:</strong> {seriesState.started ? 'Yes' : 'No'}</p>
                  <p><strong>Finished:</strong> {seriesState.finished ? 'Yes' : 'No'}</p>
                  <h4>Teams</h4>
                  <ul>
                    {seriesState.teams.map(team => (
                      <li key={team.name}>
                        <strong>{team.name}</strong> - Won: {team.won ? 'Yes' : 'No'}
                      </li>
                    ))}
                  </ul>
                  <h4>Games</h4>
                  {seriesState.games.length > 0 ? (
                    seriesState.games.map(game => (
                      <div key={game.sequenceNumber} className="game-section">
                        <h5>Game {game.sequenceNumber}</h5>
                        <div className="row">
                          {game.teams.map(team => (
                            <div key={team.name} className="col-md-6 team-section">
                              <h6>Team: {team.name}</h6>
                              <ul className="list-group">
                                {team.players.map(player => (
                                  <li key={player.name} className="list-group-item player-item">
                                    <strong>{player.name}</strong> - Kills: {player.kills}, Deaths: {player.deaths}, Net Worth: {player.netWorth}, Money: {player.money}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No games available.</p>
                  )}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
