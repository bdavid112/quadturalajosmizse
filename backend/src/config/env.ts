import dotenv from "dotenv";

dotenv.config();

export const PORT = parseInt(process.env.PORT!) || 3001;
export const HOST = "0.0.0.0";
export const SESSION_SECRET = process.env.SESSION_SECRET || "supersecret";
export const MONGO_URI = process.env.MONGO_URI as string;
