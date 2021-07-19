import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_REVIEWS_QUERY,
  SEARCH_ALBUMS_QUERY,
  CREATE_REVIEW_MUTATION,
  GET_ALL_REVIEWS_BY_EMAIL_QUERY,
  GET_ALL_REVIEWS_BY_SUB_QUERY,
  EDIT_REVIEW_MUTATION,
  DELETE_REVIEW_MUTATION,
} from "@/apollo/queries";

export const SearchAlbumsQuery = (options) => useLazyQuery(SEARCH_ALBUMS_QUERY, options);
export const GetAllReviewsByEmailQuery = (options) => useQuery(GET_ALL_REVIEWS_BY_EMAIL_QUERY, options);
export const GetAllReviewsBySubQuery = (options) => useQuery(GET_ALL_REVIEWS_BY_SUB_QUERY, options);
export const GetAllReviewsQuery = (options) => useQuery(GET_ALL_REVIEWS_QUERY, options);

export const CreateReviewMutation = (options) => useMutation(CREATE_REVIEW_MUTATION, options);
export const EditReviewMutation = (options) => useMutation(EDIT_REVIEW_MUTATION, options);
export const DeleteReviewMutation = (options) => useMutation(DELETE_REVIEW_MUTATION, options);
