// Load environment variables from .env file
require('dotenv').config();

const io = require('socket.io-client');

// Get the API key from environment variables
const apiKey = process.env.GRID_API_KEY;

// Replace 'series-id' with the actual series ID you want to subscribe to
const seriesId = 'series-1';

// Connect to the WebSocket server
const socket = io('http://localhost:3000/series-events', {
  query: {
    key: apiKey,
  },
});

socket.on('connect', () => {
  console.log('Connected to WebSocket server');

  // Subscribe to a specific series
  socket.emit('subscribeToSeries', { seriesId });

  // Listen for event updates
  socket.on('eventUpdate', (event) => {
    console.log('Received event update:', event);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });
});
