import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import bcrypt from "bcrypt";
import session from "express-session";

import bookingRoutes from "./routes/bookings.js";
import AdminUser from "./models/AdminUser.js";

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

/* Register AdminJS with Mongoose */
AdminJS.registerAdapter(AdminJSMongoose);

const admin = new AdminJS({
  databases: [mongoose],
  rootPath: "/admin",
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate: async (email, password) => {
      const user = await AdminUser.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        return { email: user.email };
      }
      return null;
    },
    cookiePassword: process.env.SESSION_SECRET || "supersecret",
  },
  null, // ✅ Keep this as null to let AdminJS create an Express router
  {
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false, // ✅ Explicitly define resave
    saveUninitialized: false, // ✅ Explicitly define saveUninitialized
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    },
  }
);

/* ✅ Wrap the AdminJS Router with sessionMiddleware */
app.use(admin.options.rootPath, adminRouter);

/* Serve frontend */
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
});

/* Start server */
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
