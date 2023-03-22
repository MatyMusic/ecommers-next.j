import NextAuth from "next-auth";
// import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import GitHubProvider from "next-auth/providers/github";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import User from "@/models/User";
import db from "@/utils/db";
// import session from "redux-persist/lib/storage/session";
db.connectDb();
// import { signIn } from "next-auth/react";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    // OAuth authentication providers...

    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;

        const user = await User.findOne({ email });

        if (user) {
          // כל אובייקט יישמר בנכס המשתמש של ה-JWT
          return signInUser({ password, user });
        } else {
          // אם תחזיר null, תוצג שגיאה המייעצת למשתמש לבדוק את פרטיו
          throw new Error('דוא"ל זה לא קיים במערכת');

          // אתה יכול גם לדחות התקשרות חוזרת זו עם שגיאה, כך שהמשתמש יישלח לדף השגיאה עם הודעת השגיאה כפרמטר שאילתה
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      let user = await User.findById(token.sub);
      session.user.id = token.sub || user._id.toString();
      session.user.role = user.role || "user";
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
});

const signInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("הכנס סיסמא בבקשה");
  }

  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error('דוא"ל או סיסמא לא נכונים');
  }
  return user;
};
