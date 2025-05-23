import AdminJS, { ComponentLoader } from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import bcrypt from "bcrypt";

import { SESSION_SECRET } from "../config/env.js";
import { locale } from "./locales/hu.js";

import Booking from "../models/Booking.js";
import bookingResourceOptions from "./bookingResourceOptions.js";
import Tour from "../models/Tour.js";
import tourResourceOptions from "./tourResourceOptions.js";
import AdminUser from "../models/AdminUser.js";
import adminUserResourceOptions from "./adminUserResourceOptions.js";
import Review from "../models/Review.js";
import reviewResourceOptions from "./reviewReourceOptions.js";

// Load Dashboard Component
const componentLoader = new ComponentLoader();
const Components = {
  Dashboard: componentLoader.add("Dashboard", "./dashboard"),
};

export async function buildAdminPanel() {
  // Configure AdminJS
  AdminJS.registerAdapter(AdminJSMongoose);

  const admin = new AdminJS({
    resources: [
      { resource: Booking, options: bookingResourceOptions },
      { resource: Tour, options: tourResourceOptions },
      { resource: AdminUser, options: adminUserResourceOptions },
      { resource: Review, options: reviewResourceOptions },
    ],
    rootPath: "/admin",
    locale,
    dashboard: {
      component: Components.Dashboard,
    },
    componentLoader,
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email, password) => {
        const user = await AdminUser.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
          return { _id: user._id, email: user.email, role: user.role };
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

  return { admin, adminRouter };
}
