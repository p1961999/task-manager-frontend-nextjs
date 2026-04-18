export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  authAccessToken: string;
  refreshToken: string;
}