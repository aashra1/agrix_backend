import { z } from "zod";
import { UserSchema } from "../types/user.type";

// Remove confirmPassword completely
export const CreateUserDTO = UserSchema.pick({
  fullName: true,
  email: true,
  phoneNumber: true,
  password: true,
  isAdmin: true,
  address: true,
});

export type CreateUserDTO = z.infer<typeof CreateUserDTO>;

export const LoginUserDTO = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginUserDTO = z.infer<typeof LoginUserDTO>;

export const EditUserDTO = UserSchema.pick({
  fullName: true,
  email: true,
  phoneNumber: true,
  address: true,
}).partial();

export type EditUserDTO = z.infer<typeof EditUserDTO>;