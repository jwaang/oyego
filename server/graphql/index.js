const { ApolloServer, gql } = require("apollo-server-express");
const { searchQuery, searchMutation } = require("./resolvers");
const { ablumSearchTypes } = require("./types");

exports.createApolloServer = () => {
  // Construct a schema, using GRAPHQL schema language
  const typeDefs = gql(`
  ${ablumSearchTypes}

  type Query {
    searchAlbums(artist: String, accessToken: String, limit: String): AlbumSearch
  }
  `);

  // The root provides a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...searchQuery,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  return apolloServer;
};
