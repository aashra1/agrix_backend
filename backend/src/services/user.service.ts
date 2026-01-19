// src/services/user.service.ts
import { UserRepository, IUserRepository } from "../repositories/user.repository";
import { User } from "../types/user.type";

const userRepository: IUserRepository = new UserRepository();

export class UserService {
  createUser = async (user: User) => {
    const existByEmail = await userRepository.findByEmail(user.email);
    if (existByEmail) {
      throw new Error("User with this email already exists");
    }

    const { _id, ...userData } = user;

    return userRepository.createUser(userData);
  };

  updateUser = async (userId: string, updatedData: Partial<User>) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new Error("User not found");

    const { _id, ...data } = updatedData;

    return userRepository.updateUser(userId, data);
  };

  getAllUsers = async (page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit;
    return userRepository.getAllUsers(skip, limit);
  };

  getUserById = async (userId: string) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new Error("User not found");
    return user;
  };

  // Add this missing method
  getUserByEmail = async (email: string) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");
    return user;
  };

  deleteUser = async (userId: string) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new Error("User not found");
    return userRepository.deleteUser(userId);
  };
}