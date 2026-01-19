import { z } from "zod";

export const RegisterBusinessDto = z.object({
  businessName: z.string().min(1, "Business name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().optional(),
});

export type RegisterBusinessDto = z.infer<typeof RegisterBusinessDto>;

export const LoginBusinessDto = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginBusinessDto = z.infer<typeof LoginBusinessDto>;

export const ApproveBusinessDto = z.object({
  action: z.enum(["Approve", "Reject"]),
});

export type ApproveBusinessDto = z.infer<typeof ApproveBusinessDto>;
