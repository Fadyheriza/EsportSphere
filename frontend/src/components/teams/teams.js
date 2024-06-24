import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Teams.css';

const TeamsList = () => {
    const [teams, setTeams] = useState([]);
    const [hoverTeam, setHoverTeam] = useState(null);
    const [teamDetails, setTeamDetails] = useState({});

    useEffect(() => {
        if (teamId) {
            fetchTeam();
        }
    }, [teamId, fetchTeam]);

    const renderContent = () => {
        if (!team) return null;
        switch (activeTab) {
            case 'roster':
                return (
                    <div>
                        <h5>Roster</h5>
                        <ul>
                            {team.roster.map(player => (
                                <li key={player.id}>{player.name} - {player.role}</li>
                            ))}
                        </ul>
                    </div>
                );
            case 'statistics':
                return (
                    <div>
                        <h5>Statistics</h5>
                        <p>{team.statistics}</p>
                    </div>
                );
            case 'earnings':
                return (
                    <div>
                        <h5>Earnings</h5>
                        <p>{team.earnings}</p>
                    </div>
                );
            default:
                return null;
        }
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
