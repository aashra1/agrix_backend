import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  address?: string;
  isAdmin?: boolean;
  role?: "User" | "Admin";
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    isAdmin: { type: Boolean, default: false },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);