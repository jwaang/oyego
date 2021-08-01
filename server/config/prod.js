module.exports = {
  DATABASE: process.env.DATABASE,
  BASE_URL: process.env.BASE_URL,
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
};

// Create a .env.local or config var in prod and define NEXTAUTH_URL=https://BASE_URL/api/auth
