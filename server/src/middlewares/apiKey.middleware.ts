import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"

dotenv.config()

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    console.error("API key is missing");
    res.status(401).json({ 
      error: "API key is required",
      message: "Please provide an API key in the x-api-key header"
    });
    return;
  }

  if (apiKey !== process.env.API_KEY) {
    res.status(403).json({ 
      error: "Invalid API key",
      message: "The provided API key is not valid"
    });
    return;
  }

  next();
}; 