import mongoose from "mongoose";
import dotenv from "dotenv";
import AdminUser from "../src/models/AdminUser.ts";

dotenv.config();

/* Get email & password from command-line arguments */
const args = process.argv.slice(2);
const email = args[0];
const password = args[1];

if (!email || !password) {
  console.error(
    "⚠️ Please provide an email and password: npm run create-admin admin@example.com MySecurePassword"
  );
  process.exit(1);
}

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const existingAdmin = await AdminUser.findOne({
      email,
    });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      return process.exit();
    }

    const newAdmin = new AdminUser({
      email,
      password,
    });

    await newAdmin.save();
    console.log("✅ Admin user created successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
