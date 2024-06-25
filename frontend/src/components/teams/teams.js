import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Teams.css';

const TeamsList = () => {
    const [teams, setTeams] = useState([]);
    const [teamDetails, setTeamDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const teamIds = [47353, 47381, 47369, 47372, 47355, 47360, 92, 78, 98, 234, 2148, 47573, 2977, 47364, 47850, 47414, 47310, 48662, 47388, 48489, 47356];

    const fetchTeamData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/csgo-teams/${id}`, {
                headers: {
                    'x-api-key': 'your-api-key'
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching team data for ID ${id}:`, error);
            throw error;
        }
    };

    const fetchTeamRoster = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/csgo-teams/${id}/roster`, {
                headers: {
                    'x-api-key': 'your-api-key'
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching team roster for ID ${id}:`, error);
            throw error;
        }
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                for (const id of teamIds) {
                    const teamData = await fetchTeamData(id);
                    setTeams(prevTeams => [...prevTeams, teamData]);
                    await delay(3000);  
                }
            } catch (error) {
                console.error("Error fetching teams:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    const handleMouseEnter = async (teamId) => {
        if (!teamDetails[teamId]) {
            try {
                const rosterData = await fetchTeamRoster(teamId);
                setTeamDetails(prevDetails => ({
                    ...prevDetails,
                    [teamId]: rosterData
                }));
            } catch (error) {
                console.error(`Error fetching team details for team ${teamId}:`, error);
            }
        }
    };

    return (
        <div className="container my-5">
            <h1 className="team-title">CSGO Teams</h1>
            {loading && teams.length === 0 ? (
                <p>Loading teams...</p>
            ) : (
                <div className="row">
                    {teams.map(team => (
                        <div className="col-md-4" key={team.id}>
                            <div 
                                className="card mb-4" 
                                onMouseEnter={() => handleMouseEnter(team.id)}
                            >
                                <img
                                    src={team.logoUrl}
                                    className="card-img-top team-logo"
                                    alt={`${team.name} logo`}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{team.name}</h5>
                                    {teamDetails[team.id] && (
                                        <ul className="player-list">
                                            {teamDetails[team.id].map(player => (
                                                <li key={player.id}>{player.nickname}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeamsList;
