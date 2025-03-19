import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IAdminUser extends Document {
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const AdminUserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

/* Hash password before saving */
AdminUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt); // ✅ Type Assertion
    next();
  } catch (err) {
    next(err as any); // ✅ Ensure next() gets an error if hashing fails
  }
});

/* Method to compare passwords */
AdminUserSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);
