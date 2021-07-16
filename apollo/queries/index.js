import { gql } from "apollo-boost";

export const SEARCH_ALBUMS_QUERY = gql`
  query SearchAlbums($artist: String, $accessToken: String, $limit: String) {
    searchAlbums(artist: $artist, accessToken: $accessToken, limit: $limit) {
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
