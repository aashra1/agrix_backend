export interface RegisterBusinessDto {
  businessName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  location?: string;
}

export interface LoginBusinessDto {
  username: string;
  password: string;
}

export interface ApproveBusinessDto {
  action: "Approve" | "Reject";
}
