import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    modelName: "user",
    fields: {
      name: "name",
      email: "email",
      image: "image",
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
});