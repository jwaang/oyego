exports.searchQuery = {
  searchAlbums: async (root, { artist, accessToken, limit }, ctx) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=album&market=US&limit=${limit}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    return response;
  },
};
