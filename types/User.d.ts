export interface User {
  id: string;
  email: string;
  name: string;
  firstSurname: string;
  secondSurname?: string;
  birthdate?: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  completedProfile: boolean;
  imageUrl: string;
  birthday: string;
  union: string;
  gender: string;
  companyID: string;
}

export interface NewUser {
  email: string;
  password: string;
}

export type UserUpdate = Partial<Omit<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>>;

export type UserFields = keyof User;