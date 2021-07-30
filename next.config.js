const path = require("path");

const dev = process.env.NODE_ENV !== "production";

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  env: {
    BASE_URL: dev ? "http://localhost:3000" : "https://oyego.herokuapp.com",
  },
  images: {
    domains: ["i.scdn.co"],
  },
};
