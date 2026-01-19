import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../types/user.type";
import { CreateUserDTO, LoginUserDTO, EditUserDTO } from "../dtos/user.dto";
import { UserService } from "../services/user.service";

export class UserController {

  private userService = new UserService();

  // Register user/admin
  register = async (req: Request, res: Response) => {
    try {
      const validation = CreateUserDTO.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error });
      }

      const {
        fullName,
        email,
        phoneNumber,
        password,
        isAdmin,
        address,
      } = validation.data;

      const role = isAdmin ? "Admin" : "User";
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: User = {
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
        address,
        isAdmin: isAdmin || false,
        role,
      };

      const createdUser = await this.userService.createUser(newUser);

      return res.status(201).json({
        success: true,
        message: `${role} registered successfully.`,
        user: createdUser,
      });

    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  // Login user/admin (EMAIL)
  loginUser = async (req: Request, res: Response) => {
    try {
      const validation = LoginUserDTO.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error });
      }

      const { email, password } = validation.data;

      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      const payload = {
        id: user._id,
        role: user.role,
        isAdmin: user.isAdmin,
      };

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      const { password: _, ...userData } = user;

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: userData,
      });

    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  // Get all users
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const users = await this.userService.getAllUsers(page, limit);

      res.status(200).json({
        success: true,
        count: users.length,
        users,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // Get user profile
  getUserProfile = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.getUserById(req.params.userId);
      const { password, ...profile } = user;

      res.status(200).json({ success: true, profile });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  // Update user
  editUserProfile = async (req: Request, res: Response) => {
    try {
      const validation = EditUserDTO.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error });
      }

      const updatedUser = await this.userService.updateUser(
        req.params.userId,
        validation.data
      );

      res.status(200).json({ success: true, updatedUser });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // Delete user
  deleteUserAccount = async (req: Request, res: Response) => {
    try {
      await this.userService.deleteUser(req.params.userId);
      res.status(200).json({ success: true, message: "User deleted" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
