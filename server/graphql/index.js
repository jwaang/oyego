const { ApolloServer, gql } = require("apollo-server-express");
const { searchQuerys, reviewMutations, reviewQuerys } = require("./resolvers");
const { ablumSearchTypes, reviewType } = require("./types");
const mongoose = require("mongoose");

const Review = require("./models/Review");

exports.createApolloServer = () => {
  // Construct a schema, using GRAPHQL schema language
  const typeDefs = gql(`
  ${ablumSearchTypes}
  ${reviewType}

  type Query {
    searchAlbums(input: AlbumSearchInput): AlbumSearch
    getAllReviews: [Review]
    getAllReviewsByEmail(email: String): [Review]
    getAllReviewsBySub(sub: String): [Review]
  }

  type Mutation {
    createReview(input: CreateReviewInput): Review
    editReview(id: ID, input: EditReviewInput): Review
    deleteReview(id: ID): ID
  }
  `);

  // The root provides a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...searchQuerys,
      ...reviewQuerys,
    },
    Mutation: {
      ...reviewMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models: {
        Review: new Review(mongoose.model("Review")),
      },
    }),
  });

  return apolloServer;
};
