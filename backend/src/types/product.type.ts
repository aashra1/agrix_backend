import { Types } from "mongoose";

export interface IProduct {
  business: Types.ObjectId;
  name: string;
  category: Types.ObjectId;
  brand?: string;
  manufacturer?: string;
  price: number;
  discount?: number;
  stock: number;
  weight?: number;
  unitType?: string;
  shortDescription?: string;
  fullDescription?: string;
  image?: string;
}
