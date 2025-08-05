import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "@/types/User";
dotenv.config();

export default function signJwt(user: User) {
  const token = jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: "1y",
  });
  return token;
}
