import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Business, BusinessDocument } from "../model/business.model";
import { RegisterBusinessDto, LoginBusinessDto, ApproveBusinessDto } from "../dtos/business.dto";

dotenv.config();

export class BusinessService {
  // Register a new business
  async register(dto: RegisterBusinessDto) {
    const { businessName, username, email, phoneNumber, password, confirmPassword, location } = dto;

    if (!businessName || !username || !email || !phoneNumber || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }

    if (password !== confirmPassword) throw new Error("Passwords do not match");

    const existing = await Business.findOne({ $or: [{ email }, { username }] });
    if (existing) throw new Error("Business already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newBusiness = new Business({
      businessName,
      username,
      email,
      phoneNumber,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      location,
      businessStatus: "Pending",
    });

    await newBusiness.save();

    const tempToken = jwt.sign(
      { id: newBusiness._id, role: "Business", temp: true },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return {
      message: "Business registered successfully. Please upload your document for verification.",
      tempToken,
    };
  }

  // Business login
  async login(dto: LoginBusinessDto) {
    const { username, password } = dto;
    const business = await Business.findOne({ username });
    if (!business) throw new Error("Business not found");

    const isMatch = await bcrypt.compare(password, business.password);
    if (!isMatch) throw new Error("Invalid credentials");

    if (business.businessStatus === "Pending") throw new Error("Please upload document and wait for admin approval");
    if (business.businessStatus === "Rejected") throw new Error("Business registration rejected by admin");

    const token = jwt.sign(
      { id: business._id, role: business.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return { business, token, message: "Business logged in successfully" };
  }

  // Upload business document
  async uploadDocument(businessId: string, documentPath: string): Promise<BusinessDocument> {
    const business = await Business.findById(businessId);
    if (!business) throw new Error("Business not found");

    business.businessDocument = documentPath;
    business.businessStatus = "Pending";

    return business.save();
  }

  // Approve or reject business
  async approveBusiness(businessId: string, dto: ApproveBusinessDto): Promise<BusinessDocument> {
    const business = await Business.findById(businessId);
    if (!business) throw new Error("Business not found");

    if (dto.action === "Approve") {
      business.businessVerified = true;
      business.businessStatus = "Approved";
    } else {
      business.businessVerified = false;
      business.businessStatus = "Rejected";
    }

    return business.save();
  }

  // Get all businesses
  async getAllBusinesses(): Promise<BusinessDocument[]> {
    return Business.find();
  }
}
