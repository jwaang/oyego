import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import jwt from "jsonwebtoken";
import moment from "moment";
const config = require("@/server/config");

const options = {
  providers: [
    Providers.Spotify({
      id: "spotify",
      name: "Spotify",
      type: "oauth",
      version: "2.0",
      scope: "user-read-email",
      params: { grant_type: "authorization_code" },
      accessTokenUrl: "https://accounts.spotify.com/api/token",
      authorizationUrl: "https://accounts.spotify.com/authorize?response_type=code",
      profileUrl: "https://api.spotify.com/v1/me",
      clientId: config.SPOTIFY_CLIENT_ID,
      clientSecret: config.SPOTIFY_CLIENT_SECRET,

      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
        };
      },
    }),
  ],
  secret: config.JWT_SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: config.JWT_SECRET,
    encryption: true,
    encode: async ({ secret, token, maxAge }) => {
      // Spotify access token expires after one hour
      const jwtClaims = {
        sub: token.sub.toString(),
        name: token.name,
        picture: token.picture,
        email: token.email,
        accessToken: token.accessToken,
        iat: Date.now() / 1000,
        exp: moment().add(1, "hours").unix(),
      };
      const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: "HS256" });
      return encodedToken;
    },
    decode: async ({ secret, token, maxAge }) => {
      const decodedToken = jwt.verify(token, secret, { algorithms: ["HS256"] });
      return decodedToken;
    },
  },
  callbacks: {
    async jwt(token, _, account) {
      if (account) {
        token.id = account.id;
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, user) {
      session.user = user;
      if (moment().unix() < session.user.exp) {
        return session;
      }
      return null;
    },
    redirect: async (url, baseUrl) => {
      // For local
      // if (url === `${config.BASE_URL}/home`) {
      //   // used by signIn
      //   return Promise.resolve(`${config.BASE_URL}/home`);
      // }
      // used by signOut
      return Promise.resolve(`${config.BASE_URL}/home`);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
