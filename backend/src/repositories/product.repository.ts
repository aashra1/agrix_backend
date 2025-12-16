import { Product, ProductDocument } from "../model/product.model";
import { Types } from "mongoose";

export class ProductRepository {
  create(data: Partial<ProductDocument>) {
    return Product.create(data);
  }

  findByBusiness(businessId: string) {
    return Product.find({ business: businessId }).populate("category", "name");
  }

  findById(productId: string) {
    return Product.findById(productId).populate("category", "name");
  }

  update(product: ProductDocument) {
    return product.save();
  }

  delete(productId: string) {
    return Product.findByIdAndDelete(productId);
  }
}
