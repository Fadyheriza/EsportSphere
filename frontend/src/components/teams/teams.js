import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Teams.css';

const TeamsList = () => {
    const [teams, setTeams] = useState([]);
    const [hoverTeam, setHoverTeam] = useState(null);
    const [teamDetails, setTeamDetails] = useState({});

    useEffect(() => {
        const fetchTeams = async () => {
            const teamIds = [1, 2, 4]; // Replace with your actual team IDs
            const teamsData = await Promise.all(
                teamIds.map(async (id) => {
                    const response = await axios.get(`http://localhost:3000/csgo-teams/${id}`, {
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
            const response = await axios.get(`http://localhost:3000/csgo-teams/${teamId}`, {
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
        <div className="container my-5">
            <h1 className="team-title">CSGO Teams</h1>
            <div className="row">
                {teams.map(team => (
                    <div className="col-md-4" key={team.id}>
                        <div className="card mb-4">
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
    );
};

export default TeamsList;