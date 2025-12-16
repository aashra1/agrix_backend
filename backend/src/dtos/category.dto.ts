export interface CreateCategoryDTO {
  name: string;
  description?: string;
  
  parentCategory?: string;
}

export interface UpdateCategoryDTO extends Partial<CreateCategoryDTO> {}