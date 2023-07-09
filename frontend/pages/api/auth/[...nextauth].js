import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import axios from "axios";

// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60;            // 45 minutes (60 minutes)
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;  // 6 days (7 days)
const BACKEND_SOCIAL_PROVIDERS = ["google", "twitter"];

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {label: "Username", type: "text"},
        password: {label: "Password", type: "password"}
      },
      // The data returned from this function is passed forward as the
      // `user` variable to the signIn() and jwt() callback
      async authorize(credentials, req) {
        try {
          const response = await axios({
            url: process.env.NEXTAUTH_BACKEND_URL + "auth/login/",
            method: "post",
            data: credentials,
          });
          const data = response.data;
          if (data) return data;
        } catch (error) {
          console.error(error);
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0",  // Opt-in to Twitter OAuth 2.0
    }),
  ],
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      if (account.provider === "google") {
        try {
          const response = await axios({
            method: "post",
            url: process.env.NEXTAUTH_BACKEND_URL + "auth/google/",
            data: {
              access_token: account["id_token"]
            },
          });
          account["meta"] = response.data;
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      } else if (account.provider === "twitter") {
        try {
          const response = await axios({
            method: "post",
            url: process.env.NEXTAUTH_BACKEND_URL + "auth/twitter/",
            data: {
              access_token: account["access_token"],
              token_secret: "x",  // Twitter requires this field for some reason ¯\_(ツ)_/¯
            },
          });
          account["meta"] = response.data;
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      } else {
        return true;
      }
    },
    async jwt({user, token, account}) {
      // If `user` and `account` are set that means it is a login/sign in event
      if (user && account) {
        let backendResponse = BACKEND_SOCIAL_PROVIDERS.includes(account.provider) ? account.meta : user;
        token["user"] = backendResponse.user;
        token["access_token"] = backendResponse.access;
        token["refresh_token"] = backendResponse.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        return token;
      }
      // Refresh the backend token if necessary
      if (getCurrentEpochTime() > token["ref"]) {
        const response = await axios({
          method: "post",
          url: process.env.NEXTAUTH_BACKEND_URL + "auth/token/refresh/",
          data: {
            refresh: token["refresh_token"],
          },
        });
        token["access_token"] = response.data.access;
        token["refresh_token"] = response.data.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }
      // TODO: Implement Google and Twitter refresh token rotation
      // This can be implemented in a similar way as the backend token rotation.
      // For reference check out: https://authjs.dev/guides/basics/refresh-token-rotation
      return token;
    },
    // We're using JWT instead of database, so we are forced to pass
    // backend's `access_token` and `refresh_token` to the client
    async session({token}) {
      return token;
    },
  }
};

export default NextAuth(authOptions);