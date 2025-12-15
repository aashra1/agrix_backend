import { Router } from "express";
import { BusinessController } from "../controllers/business.controller";
import { authGuard, authGuardAdmin } from "../middleware/authGuard";
import uploadBusinessDoc from "../multer/multerBusiness";

const router = Router();

// Public routes
router.post("/register", BusinessController.register);
router.post("/login", BusinessController.login);

// Protected routes
router.post("/upload-document", authGuard, uploadBusinessDoc.single("document"), BusinessController.uploadDocument);

// Admin-only routes
router.put("/admin/approve/:businessId", authGuard, authGuardAdmin, BusinessController.approve);
router.get("/admin/all", authGuard, authGuardAdmin, BusinessController.getAll);

export default router;
