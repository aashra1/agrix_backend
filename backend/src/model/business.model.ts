import mongoose, { Document, Schema, Model } from "mongoose";
import { IBusiness } from "../types/business.type";

export interface BusinessDocument extends Document {
  businessName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  location?: string;
  role: string;
  businessDocument?: string;
  businessVerified: boolean;
  businessStatus: "Pending" | "Approved" | "Rejected";
}

const businessSchema: Schema<BusinessDocument> = new Schema(
  {
    businessName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    location: { type: String },
    role: { type: String, default: "Business" },
    businessDocument: { type: String },
    businessVerified: { type: Boolean, default: false },
    businessStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Business: Model<BusinessDocument> =
  mongoose.model<BusinessDocument>("Business", businessSchema);
