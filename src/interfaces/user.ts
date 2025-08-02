export type User = {
  id: number;
  username: string;
  email: string; // Novo campo
  password: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type Session = {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
  createdAt: Date;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: Omit<User, "password">;
  expiresAt: Date;
};
