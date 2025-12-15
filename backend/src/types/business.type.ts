export type BusinessStatus = "Pending" | "Approved" | "Rejected";

export interface IBusiness {
  _id?: string;
  businessName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  location?: string;
  role?: string;
  businessDocument?: string;
  businessVerified?: boolean;
  businessStatus?: BusinessStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
