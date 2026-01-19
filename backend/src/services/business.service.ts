import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BusinessRepository } from "../repositories/business.repository";
import { BusinessDocument } from "../model/business.model";
import {
  RegisterBusinessDto,
  LoginBusinessDto,
  ApproveBusinessDto,
} from "../dtos/business.dto";

const businessRepository = new BusinessRepository();

export class BusinessService {
  private sanitizeBusiness(business: any) {
    const businessObj = business.toObject ? business.toObject() : business;
    const { password, confirmPassword, __v, ...safeBusiness } = businessObj;
    return safeBusiness;
  }

  public getSanitizedBusiness(business: any) {
    return this.sanitizeBusiness(business);
  }

  register = async (dto: RegisterBusinessDto) => {
    const { businessName, email, phoneNumber, password, address } = dto;

    const existing = await businessRepository.findByEmail(email);
    if (existing) throw new Error("Business already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newBusinessData = {
      businessName,
      email,
      phoneNumber,
      password: hashedPassword,
      address,
      businessStatus: "Pending" as const,
    };

    const createdBusiness = await businessRepository.create(newBusinessData);

    const tempToken = jwt.sign(
      { id: createdBusiness._id, role: "Business", temp: true },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    return {
      message: "Business registered successfully. Please upload your document.",
      tempToken,
      business: this.sanitizeBusiness(createdBusiness),
    };
  };

  login = async (dto: LoginBusinessDto) => {
    const { email, password } = dto;

    const business = await businessRepository.findByEmail(email);
    if (!business) throw new Error("Business not found");

    const isMatch = await bcrypt.compare(password, business.password);
    if (!isMatch) throw new Error("Invalid credentials");

    if (business.businessStatus === "Pending")
      throw new Error("Please upload document and wait for admin approval");
    if (business.businessStatus === "Rejected")
      throw new Error("Business registration rejected by admin");

    const token = jwt.sign(
      { id: business._id, role: business.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    return {
      business: this.sanitizeBusiness(business),
      token,
      message: "Business logged in successfully",
    };
  };

  uploadDocument = async (businessId: string, documentPath: string) => {
    const business = await businessRepository.findById(businessId);
    if (!business) throw new Error("Business not found");

    business.businessDocument = documentPath;
    business.businessStatus = "Pending";

    const updated = await businessRepository.save(business);
    return this.sanitizeBusiness(updated);
  };

  approveBusiness = async (businessId: string, dto: ApproveBusinessDto) => {
    const business = await businessRepository.findById(businessId);
    if (!business) throw new Error("Business not found");

    if (dto.action === "Approve") {
      business.businessVerified = true;
      business.businessStatus = "Approved";
    } else {
      business.businessVerified = false;
      business.businessStatus = "Rejected";
    }

    const updated = await businessRepository.save(business);
    return this.sanitizeBusiness(updated);
  };

  getAllBusinesses = async () => {
    const businesses = await businessRepository.findAll();
    return businesses.map((b) => this.sanitizeBusiness(b));
  };

  getBusinessRawByEmail = async (email: string) => {
    const business = await businessRepository.findByEmail(email);
    if (!business) throw new Error("Business not found");
    return business;
  };
}
