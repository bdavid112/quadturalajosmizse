import express from "express";
import cors from "cors";
import path from "path";

import { PORT } from "./config/env.js";
import connectDB from "./config/db.js";

import bookingRoutes from "./routes/bookings.js";
import tourRoutes from "./routes/tours.js";
import paymentIntent from "./routes/paymentIntent.js";
import analyticsRoutes from "./routes/adminAnalytics.js";
import { buildAdminPanel } from "./admin/admin.js";

/* Initialize Server */
const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Connect to MongoDB */
await connectDB();

/* Register Routes */
app.use("/api/bookings", bookingRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/payment-intent", paymentIntent);
app.use("/api/admin", analyticsRoutes);

/* Register AdminJS */
const { admin, adminRouter } = await buildAdminPanel();
app.use(admin.options.rootPath, adminRouter);

/* Serve Frontend */
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
});

/* Start Server */
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
