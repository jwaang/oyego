import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_REVIEWS_QUERY,
  SEARCH_ALBUMS_QUERY,
  CREATE_REVIEW_MUTATION,
  GET_ALL_REVIEWS_BY_EMAIL_QUERY,
  GET_ALL_REVIEWS_BY_SUB_QUERY,
  GET_USER_PROFILE,
  EDIT_REVIEW_MUTATION,
  DELETE_REVIEW_MUTATION,
} from "@/apollo/queries";

export const SearchAlbumsQuery = (options) => useLazyQuery(SEARCH_ALBUMS_QUERY, options);
export const GetAllReviewsByEmailQuery = (options) => useQuery(GET_ALL_REVIEWS_BY_EMAIL_QUERY, options);
export const GetAllReviewsBySubQuery = (options) => useLazyQuery(GET_ALL_REVIEWS_BY_SUB_QUERY, options);
export const GetAllReviewsQuery = (options) => useLazyQuery(GET_ALL_REVIEWS_QUERY, options);
export const GetUserProfileQuery = (options) => useQuery(GET_USER_PROFILE, options);

export const CreateReviewMutation = (options) => useMutation(CREATE_REVIEW_MUTATION, options);
export const EditReviewMutation = (options) => useMutation(EDIT_REVIEW_MUTATION, options);
export const DeleteReviewMutation = (options) => useMutation(DELETE_REVIEW_MUTATION, options);
