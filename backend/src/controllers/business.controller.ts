import { Request, Response } from "express";
import { BusinessService } from "../servives/business.service";

const businessService = new BusinessService();

export class BusinessController {
  // Register business
  static async register(req: Request, res: Response) {
    try {
      const result = await businessService.register(req.body);
      res.status(201).json({ success: true, ...result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Login business
  static async login(req: Request, res: Response) {
    try {
      const result = await businessService.login(req.body);
      res.status(200).json({ success: true, ...result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Upload business document
  static async uploadDocument(req: Request, res: Response) {
    try {
      const businessId = req.user?.id;
      if (!businessId) throw new Error("Unauthorized: No user ID found");
      if (!req.file) throw new Error("No document uploaded");

      const updated = await businessService.uploadDocument(businessId, req.file.path);
      res.status(200).json({ success: true, message: "Document uploaded", document: updated.businessDocument });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Approve/reject business
  static async approve(req: Request, res: Response) {
    try {
      const { businessId } = req.params;
      const updated = await businessService.approveBusiness(businessId, req.body);
      res.status(200).json({
        success: true,
        message: `Business ${req.body.action}d successfully`,
        businessStatus: updated.businessStatus,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Get all businesses
  static async getAll(req: Request, res: Response) {
    try {
      const businesses = await businessService.getAllBusinesses();
      res.status(200).json({ success: true, businesses });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
