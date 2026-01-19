export type BusinessStatus = "Pending" | "Approved" | "Rejected";

export interface IBusiness {
  _id?: string;
  businessName: string;
  email: string;
  phoneNumber: string;
  password: string;
  address?: string;
  role?: string;
  businessDocument?: string;
  businessVerified?: boolean;
  businessStatus?: BusinessStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
