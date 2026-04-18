import { create } from "zustand";
import { User } from "@/types/auth";

interface AuthState {
  user: User | null;
  authAccessToken: string | null;
  refreshToken: string | null;
  setAuth: (data: {
    user: User;
    authAccessToken: string;
    refreshToken: string;
  }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  authAccessToken: null,
  refreshToken: null,

  setAuth: ({ user, authAccessToken, refreshToken }) => {
    if (typeof window != "undefined") {
      localStorage.setItem("authAccessToken", authAccessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
    }

    set({ user, authAccessToken, refreshToken });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authAccessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }

    set({ user: null, authAccessToken: null, refreshToken: null });
  },
}));
