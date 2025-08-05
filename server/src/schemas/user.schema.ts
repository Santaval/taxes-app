import {z} from 'zod';

export const NewUserSchema = z.object({
  name: z.string({
    message: "Name is required",

  }).max(100, {
    message: "Name must be at most 100 characters long",
  }),
});

export const UserSchema = NewUserSchema.extend({
  id: z.string({
    message: "ID is required",
  }),
  createdAt: z.date({
    message: "Created at is required",
  }),
});


export const SignUpSchema = z.object({
  email: z.string({
    message: "Email is required",
  }),
  password: z.string({
    message: "Password is required",
  }).min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

