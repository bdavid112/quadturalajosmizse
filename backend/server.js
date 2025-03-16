import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

import bookingRoutes from "./routes/bookings.js";

/* Load environment variables */
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Connect to MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

/* API routes */
app.use("api/bookings", bookingRoutes);

/* Serve Frontend */
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
});

/* Start Server */
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
