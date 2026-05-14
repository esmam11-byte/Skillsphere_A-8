import { betterAuth } from "better-auth";

// Simple in-memory storage for development
const users = new Map();

export const auth = betterAuth({
  database: {
    get: async (key) => users.get(key),
    set: async (key, value) => users.set(key, value),
    delete: async (key) => users.delete(key),
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
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
    expiresIn: 60 * 60 * 24 * 7,
  },
});
