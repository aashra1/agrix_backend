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
router.delete("/:userId", userController.deleteUserAccount);

router.put(
  "/:userId",
  uploadProfilePicture.single("profilePicture"),
  userController.editUserProfile,
);

export default router;
