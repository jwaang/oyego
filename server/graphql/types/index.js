exports.userProfileTypes = `
  input UserProfileInput {
    sub: String
    accessToken: String
  }

  type UserProfile {
    display_name: String
    external_urls: ExternalUrl
    followers: Followers
    href: String
    id: String
    images: [Image]
    type: String
    uri: String
  }

  type Followers {
    href: String
    total: Int
  }
`;

exports.ablumSearchTypes = `
  input AlbumSearchInput {
    artist: String
    accessToken: String
    limit: String
  }

  type AlbumSearch {
    albums: Albums
  }

  type Albums {
    href: String
    items: [Item]
    limit: Int
    next: String
    offset: Int
    previous: String
    total: Int
  }

  type Item {
    album_type: String
    artists: [Artist]
    external_urls: ExternalUrl
    href: String
    id: String
    images: [Image]
    name: String
    release_date: String
    release_date_precision: String
    total_tracks: Int
    type: String
    uri: String
  }

  type Artist {
    external_urls: ExternalUrl
    href: String
    id: String
    name: String
    type: String
    uri: String
  }

  type ExternalUrl {
    spotify: String
  }

  type Image {
    height: Int
    url: String
    width: Int
  }
`;

exports.reviewType = `
  type Review {
    _id: ID
    image: String!
    album: String!
    artist: String!
    rating: Float!
    review: String!
    email: String!
    name: String!
    user_image: String!
    sub: String!
    lastUpdated: String!
  }

  input CreateReviewInput {
    artist: String
    album: String
    image: String
    rating: Float
    review: String
    email: String
    name: String
    user_image: String
    sub: String
  }

  input EditReviewInput {
    rating: Float
    review: String
  }
`;
