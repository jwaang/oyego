exports.searchQuerys = {
  searchAlbums: async (root, { input }, ctx) => {
    const { artist, accessToken, limit } = input;
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
  getUserProfile: async (root, { input }, ctx) => {
    const { sub, accessToken } = input;
    const response = await fetch(`https://api.spotify.com/v1/users/${sub}`, {
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

exports.reviewMutations = {
  createReview: async (root, { input }, ctx) => {
    const createdReview = await ctx.models.Review.create(input);
    return createdReview;
  },
  editReview: async (root, { id, input }, ctx) => {
    const editedReview = await ctx.models.Review.findAndUpdate(id, input);
    return editedReview;
  },
  deleteReview: async (root, { id }, ctx) => {
    const deletedReview = await ctx.models.Review.findAndDelete(id);
    return deletedReview._id;
  },
};

exports.reviewQuerys = {
  getAllReviews: async (root, args, ctx) => {
    return ctx.models.Review.getAll();
  },
  getAllReviewsByEmail: async (root, { email }, ctx) => {
    const allReviewsByEmail = await ctx.models.Review.getAllByEmail(email);
    return allReviewsByEmail;
  },
  getAllReviewsBySub: async (root, { sub }, ctx) => {
    const allReviewsBySub = await ctx.models.Review.getAllBySub(sub);
    return allReviewsBySub;
  },
};
