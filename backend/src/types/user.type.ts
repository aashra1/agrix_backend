import { z } from "zod";

export const UserSchema = z.object({
  _id: z.string().optional(),
  fullName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  password: z.string(),
  address: z.string().optional(),
  isAdmin: z.boolean().optional(),
  role: z.enum(["User", "Admin"]).optional(),
  profilePicture: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
