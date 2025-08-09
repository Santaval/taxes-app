import { z } from "zod";

export const NewClientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
});

export const UpdateClientSchema = NewClientSchema.partial();
