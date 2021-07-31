const path = require("path");

const dev = process.env.NODE_ENV !== "production";

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  images: {
    domains: ["i.scdn.co"],
  },
  env: {
    // for auth callback
    NEXTAUTH_URL: dev ? "http://localhost:3000" : "https://oyego.herokuapp.com/api/auth",
    // determine uri for withApollo.js
    BASE_URL_GRAPH: dev ? "http://localhost:3000/graphql" : "https://oyego.herokuapp.com/graphql",
  },
};
