import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Teams.css';

const Teams = () => {
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);
    const [activeTab, setActiveTab] = useState('roster');

    const fetchTeam = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3000/teams/${teamId}`);
            setTeam(response.data);
        } catch (error) {
            console.error('Error fetching team:', error);
        }
    }, [teamId]);

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
            {team ? (
                <>
                    <div className="box">
                        <h1 className="team-title">{team.name}</h1>
                        <div className="card">
                            <img src={team.logo} className="card-img-top" alt={`${team.name} logo`} />
                            <div className="card-body">
                                <h5 className="card-title">Description</h5>
                                <p className="card-text">{team.description}</p>
                            </div>
                        </div>
                        <div className="tabs mt-4">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button className={`nav-link ${activeTab === 'roster' ? 'active' : ''}`} onClick={() => setActiveTab('roster')}>Roster</button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${activeTab === 'statistics' ? 'active' : ''}`} onClick={() => setActiveTab('statistics')}>Statistics</button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${activeTab === 'earnings' ? 'active' : ''}`} onClick={() => setActiveTab('earnings')}>Earnings</button>
                                </li>
                            </ul>
                            <div className="tab-content mt-4">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Teams;
