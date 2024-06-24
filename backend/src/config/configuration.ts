export default () => ({
  gridApiUrl: process.env.GRID_API_URL,
  gridApiKey: process.env.GRID_API_KEY,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
});
