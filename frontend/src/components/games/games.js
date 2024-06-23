import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Games.css';

const Games = () => {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [tournaments, setTournaments] = useState([]);

    const fetchGame = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3000/games/${gameId}`);
            setGame(response.data);
        } catch (error) {
            console.error('Error fetching game:', error);
        }
    }, [gameId]);

    const fetchTournaments = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3000/tournaments?gameId=${gameId}`);
            setTournaments(response.data);
        } catch (error) {
            console.error('Error fetching tournaments:', error);
        }
    }, [gameId]);

    useEffect(() => {
        if (gameId) {
            fetchGame();
            fetchTournaments();
        }
    }, [gameId, fetchGame, fetchTournaments]);

    return (
        <div className="container my-5">
            {game ? (
                <>
                    <div className="box">
                        <h1 className="game-title">{game.name}</h1>
                        <div className="card">
                            <img src={game.image} className="card-img-top" alt={`${game.name} cover`} />
                            <div className="card-body">
                                <h5 className="card-title">Description</h5>
                                <p className="card-text">{game.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        <h2>Ongoing and Latest Tournaments</h2>
                        {tournaments.length > 0 ? (
                            <div className="list-group">
                                {tournaments.map(tournament => (
                                    <div key={tournament.id} className="list-group-item">
                                        <h5 className="mb-1">{tournament.name}</h5>
                                        <p className="mb-1">{tournament.description}</p>
                                        <small>Start Date: {new Date(tournament.startDate).toLocaleDateString()}</small><br />
                                        <small>End Date: {new Date(tournament.endDate).toLocaleDateString()}</small>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No tournaments available.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Games;
