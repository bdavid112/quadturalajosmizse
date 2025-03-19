import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import bookingRoutes from "./routes/bookings.js";

/* Load environment variables */
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

/* Middleware */
app.use(cors());
app.use(express.json());

/* Connect to MongoDB */
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

/* Register routes */
app.use("/api/bookings", bookingRoutes);

/* Serve frontend */
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
});

/* Start server */
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
