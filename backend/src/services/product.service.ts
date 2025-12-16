import { ProductRepository } from "../repositories/product.repository";
import { CreateProductDTO, UpdateProductDTO } from "../dtos/product.dto";
import { Types } from "mongoose";

export class ProductService {
  private repository = new ProductRepository();

  async addProduct(
    businessId: string,
    dto: CreateProductDTO,
    image?: string
  ) {
    const businessObjectId = new Types.ObjectId(businessId);
    
    const { category, ...restOfDto } = dto; 
    const categoryObjectId = new Types.ObjectId(category);

    return this.repository.create({
      business: businessObjectId, 
      category: categoryObjectId,
      ...restOfDto,
      discount: restOfDto.discount ?? 0,
      image,
    });
  }


  getBusinessProducts(businessId: string) {
    return this.repository.findByBusiness(businessId);
  }

  async getProductById(productId: string) {
    return this.repository.findById(productId);
  }

  async updateProduct(
    product: any,
    dto: UpdateProductDTO,
    image?: string
  ) {
    Object.assign(product, dto);
    if (image) product.image = image;
    return this.repository.update(product);
  }

  deleteProduct(productId: string) {
    return this.repository.delete(productId);
  }
}
