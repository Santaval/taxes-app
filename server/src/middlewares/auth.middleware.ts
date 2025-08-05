import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types/User";
// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header

    const authHeader = req.headers.authorization;
    const cookie = req.headers.cookie;
    const token = authHeader?.split(" ")[1] || searchInCookie(cookie || "") || "";
    if (!token) {
      console.log("No token provided");
      return next();
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as User;
    // Add user to request object
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    req.user = undefined;
    next();
  }
};

function searchInCookie(cookie: string) {
  const cookieArray = cookie.split(" ");
  const token = cookieArray.find((c) => c.startsWith("token="));
  return token?.split("=")[1];
}



export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
};
