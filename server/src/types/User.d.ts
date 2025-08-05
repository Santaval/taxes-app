export interface User { 
  id: string;
  name: string;
  email?: string;
  createdAt: string;
  completedProfile?: boolean;
  password?: string; // Optional for login purposes
}

export type UserFields = keyof User;
export type NewUser = Omit<User, 'id' | 'createdAt'>;
export type NewUserFields = keyof NewUser;