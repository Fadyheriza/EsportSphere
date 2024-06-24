import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MainContent.css';
import cs2Logo from '../../assets/images/cs2-logo.png'; // Correct path to the image

const MainContent = () => {
  const [teams, setTeams] = useState([]);
  const [hoverTeam, setHoverTeam] = useState(null);
  const [teamDetails, setTeamDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      const teamIds = [1, 2, 4]; // Replace with your actual team IDs
      const teamsData = await Promise.all(
        teamIds.map(async (id) => {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/csgo-teams/${id}`, {
            headers: {
              'x-api-key': 'your-api-key'
            }
          });
          return response.data;
        })
      );
      setTeams(teamsData);
    };

    fetchTeams();
  }, []);

  const handleMouseEnter = async (teamId) => {
    setHoverTeam(teamId);
    if (!teamDetails[teamId]) {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/csgo-teams/${teamId}`, {
        headers: {
          'x-api-key': 'your-api-key'
        }
      });
      setTeamDetails(prevDetails => ({
        ...prevDetails,
        [teamId]: response.data.players
      }));
    }
  };

  const handleMouseLeave = () => {
    setHoverTeam(null);
  };

  return (
    <main className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body d-flex align-items-center">
              <img src={cs2Logo} className="csgo-logo" alt="CSGO cover" />
              <div>
                <h3 className="card-title">CSGO</h3>
                <p className="card-text">
                  Counter-Strike: Global Offensive (CSGO) is a multiplayer first-person shooter developed by Valve and Hidden Path Entertainment.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Teams</h3>
              <div className="row">
                {teams.map(team => (
                  <div key={team.id} className="col-md-6 mb-4">
                    <div className="card h-100">
                      <img
                        src={team.logoUrl}
                        className="card-img-top team-logo"
                        alt={`${team.name} logo`}
                        onMouseEnter={() => handleMouseEnter(team.id)}
                        onMouseLeave={handleMouseLeave}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{team.name}</h5>
                        {hoverTeam === team.id && (
                          <ul className="player-list">
                            {teamDetails[team.id]?.map(player => (
                              <li key={player.id}>{player.name}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
