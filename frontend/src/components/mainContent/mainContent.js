import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './MainContent.css';

const MainContent = () => {
  const [games, setGames] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:3000/games');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:3000/teams');
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  useEffect(() => {
    fetchGames();
    fetchTeams();
  }, []);

  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  const handleTeamClick = (teamId) => {
    navigate(`/teams/${teamId}`);
  };

  return (
    <main className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Games We Support</h3>
              <div className="row">
                {games.map(game => (
                  <div key={game.id} className="col-md-6 mb-4">
                    <div className="card h-100" onClick={() => handleGameClick(game.id)}>
                      <img src={game.image} className="card-img-top" alt={`${game.name} cover`} />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{game.name}</h5>
                        <p className="card-text">{game.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/games" className="btn btn-primary mt-3">View All Games</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Teams We Support</h3>
              <div className="row">
                {teams.map(team => (
                  <div key={team.id} className="col-md-6 mb-4">
                    <div className="card h-100" onClick={() => handleTeamClick(team.id)}>
                      <img src={team.logo} className="card-img-top" alt={`${team.name} logo`} />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{team.name}</h5>
                        <p className="card-text">{team.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/teams" className="btn btn-primary mt-3">View All Teams</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
