import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "../types/category.type";

// 1. Define the Document interface
export interface CategoryDocument extends ICategory, Document {}

// 2. Define the Schema
const categorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model<CategoryDocument>(
  "Category",
  categorySchema
);