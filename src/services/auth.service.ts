import axiosInstance from "@/lib/axios";
import { LoginPayload, SignUpPayload, AuthResponse } from "@/types/auth";

export const authService = {
  register: async (payload: SignUpPayload) => {
    const { data } = await axiosInstance.post<AuthResponse>("/auth/register", payload);
    return data;
  },

  login: async (payload: LoginPayload) => {
    const { data } = await axiosInstance.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  refresh: async (refreshToken: string) => {
    const { data } = await axiosInstance.post("/auth/refresh", { refreshToken });
    return data;
  },

  logout: async (refreshToken: string) => {
    const { data } = await axiosInstance.post("/auth/logout", { refreshToken });
    return data;
  },
};