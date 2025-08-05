import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import router from "./routes/router";
import { authMiddleware } from "./middlewares/auth.middleware";
import { apiKeyMiddleware } from "./middlewares/apiKey.middleware";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares

const origin = process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "http://localhost:3000";

app.use(cors({
  origin, // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key']
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiKeyMiddleware);
app.use(authMiddleware);

// routes
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
