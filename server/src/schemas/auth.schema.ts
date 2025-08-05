import { z } from "zod";

const LoginRequestSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email(),
  password: z
    .string({
      message: "OTP is required",
    })
    .min(1)
    .max(50),
});



export { LoginRequestSchema };
