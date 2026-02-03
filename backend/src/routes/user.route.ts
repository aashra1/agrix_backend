import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import uploadProfilePicture from "../multer/user.multer";

const router = Router();
const userController = new UserController();

router.post(
  "/register",
  uploadProfilePicture.single("profilePicture"),
  userController.register,
);
router.post("/login", userController.loginUser);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserProfile);
router.put("/:userId", userController.editUserProfile);
router.delete("/:userId", userController.deleteUserAccount);

export default router;
