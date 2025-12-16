export interface CreateProductDTO {
  name: string;
  category: string;
  brand?: string;
  manufacturer?: string;
  price: number;
  discount?: number;
  stock: number;
  weight?: number;
  unitType?: string;
  shortDescription?: string;
  fullDescription?: string;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}
