exports.ablumSearchTypes = `
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
