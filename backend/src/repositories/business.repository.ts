import { Business, BusinessDocument } from "../model/business.model";

export class BusinessRepository {
  async create(business: Partial<BusinessDocument>): Promise<BusinessDocument> {
    const newBusiness = new Business(business);
    return newBusiness.save();
  }

  async findByUsername(username: string): Promise<BusinessDocument | null> {
    return Business.findOne({ username });
  }

  async findByEmailOrUsername(email: string, username: string): Promise<BusinessDocument | null> {
    return Business.findOne({ $or: [{ email }, { username }] });
  }

  async findById(id: string): Promise<BusinessDocument | null> {
    return Business.findById(id);
  }

  async findAll(): Promise<BusinessDocument[]> {
    return Business.find();
  }

  async save(business: BusinessDocument): Promise<BusinessDocument> {
    return business.save();
  }
}
