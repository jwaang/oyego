import { useLazyQuery } from "@apollo/client";
import { SEARCH_ALBUMS_QUERY } from "@/apollo/queries";

export const SearchAlbumsQuery = (options) => useLazyQuery(SEARCH_ALBUMS_QUERY, options);
