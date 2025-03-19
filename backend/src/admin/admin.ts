import AdminJS, { ComponentLoader } from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import AdminUser from "../models/AdminUser.js";
import { SESSION_SECRET } from "../config/env.js";

// Load Dashboard Component
const componentLoader = new ComponentLoader();
const Components = {
  Dashboard: componentLoader.add("Dashboard", "./dashboard"),
};

// Configure AdminJS
AdminJS.registerAdapter(AdminJSMongoose);

const admin = new AdminJS({
  databases: [mongoose],
  rootPath: "/admin",
  dashboard: { component: Components.Dashboard },
  componentLoader,
});

// Secure Admin Panel
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
    cookiePassword: SESSION_SECRET,
  },
  null,
  {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    },
  }
);

export { admin, adminRouter };
