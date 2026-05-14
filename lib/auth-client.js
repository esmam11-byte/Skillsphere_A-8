import { simpleAuth } from "./simple-auth";

export const authClient = {
  signUp: {
    email: async ({ email, password, name, image }) => {
      const result = simpleAuth.register(email, password, name, image);
      if (result.error) return { error: { message: result.error } };
      return { data: result.data };
    }
  },
  signIn: {
    email: async ({ email, password }) => {
      const result = simpleAuth.login(email, password);
      if (result.error) return { error: { message: result.error } };
      return { data: result.data };
    },
    social: async ({ provider, callbackURL }) => {
      // Mock Google login
      const mockUser = {
        id: "google-123",
        email: "google@example.com",
        name: "Google User",
        image: "https://ui-avatars.com/api/?name=Google+User"
      };
      simpleAuth.login(mockUser.email, "google-auth");
      window.location.href = callbackURL || "/";
    }
  },
  signOut: async () => {
    simpleAuth.logout();
  },
  getSession: async () => {
    return simpleAuth.getSession();
  }
};
