import { Business, BusinessDocument } from "../model/business.model";

export interface IBusinessRepository {
  findAll(skip?: number, limit?: number): Promise<BusinessDocument[]>;
  findById(id: string): Promise<BusinessDocument | null>;
  findByEmail(email: string): Promise<BusinessDocument | null>;
  create(business: Partial<BusinessDocument>): Promise<BusinessDocument>;
  save(business: BusinessDocument): Promise<BusinessDocument>;
}

export class BusinessRepository implements IBusinessRepository {
  async findAll(skip: number = 0, limit: number = 10) {
    return Business.find().skip(skip).limit(limit).exec();
  }

  async findById(id: string) {
    return Business.findById(id).exec();
  }

  async findByEmail(email: string) {
    return Business.findOne({ email }).exec();
  }

  async create(business: Partial<BusinessDocument>) {
    const newBusiness = new Business(business);
    return newBusiness.save();
  }

  async save(business: BusinessDocument) {
    return business.save();
  }
}
