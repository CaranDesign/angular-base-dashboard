import { Role } from "./permission.model";

// defining user structure 
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  roles: Role[]; //array of roles assigned to user
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}