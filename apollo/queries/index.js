import { gql } from "apollo-boost";

export const SEARCH_ALBUMS_QUERY = gql`
  query SearchAlbums($artist: String, $accessToken: String, $limit: String) {
    searchAlbums(input: { artist: $artist, accessToken: $accessToken, limit: $limit }) {
      albums {
        items {
          id
          name
          images {
            url
          }
          artists {
            name
          }
        }
      }
    }
  }
`;

export const GET_ALL_REVIEWS_QUERY = gql`
  query GetAllReviews {
    getAllReviews {
      _id
      sub
      image
      album
      artist
      review
      rating
      email
      name
      user_image
      lastUpdated
    }
  }
`;

export const GET_ALL_REVIEWS_BY_EMAIL_QUERY = gql`
  query GetAllReviewsByEmail($email: String) {
    getAllReviewsByEmail(email: $email) {
      _id
      image
      album
      artist
      review
      rating
      email
      name
      user_image
    }
  }
`;

export const GET_ALL_REVIEWS_BY_SUB_QUERY = gql`
  query GetAllReviewsBySub($sub: String) {
    getAllReviewsBySub(sub: $sub) {
      _id
      image
      album
      artist
      review
      rating
      email
      name
      user_image
    }
  }
`;

export const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReview(
    $artist: String
    $album: String
    $image: String
    $rating: Float
    $review: String
    $email: String
    $name: String
    $user_image: String
    $sub: String
  ) {
    createReview(
      input: {
        artist: $artist
        album: $album
        image: $image
        rating: $rating
        review: $review
        email: $email
        name: $name
        user_image: $user_image
        sub: $sub
      }
    ) {
      _id
      image
      album
      artist
      review
      rating
      email
      name
      user_image
      sub
    }
  }
`;

export const EDIT_REVIEW_MUTATION = gql`
  mutation EditReview($id: ID, $rating: Float, $review: String) {
    editReview(id: $id, input: { rating: $rating, review: $review }) {
      _id
      image
      album
      artist
      review
      rating
      email
      name
      user_image
      sub
    }
  }
`;

export const DELETE_REVIEW_MUTATION = gql`
  mutation DeleteReview($id: ID) {
    deleteReview(id: $id)
  }
`;
