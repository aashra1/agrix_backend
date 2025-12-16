import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService();

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, parentCategory } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const category = await categoryService.addCategory({
      name,
      description,
      parentCategory,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await categoryService.getCategories();

  res.json({
    success: true,
    count: categories.length,
    categories,
  });
};

export const getCategoryById = async (req: Request, res: Response) => {
  const category = await categoryService.getCategoryById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.json({ success: true, category });
};

export const updateCategory = async (req: Request, res: Response) => {
  const category = await categoryService.getCategoryById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  const updated = await categoryService.updateCategory(category, req.body);

  res.json({
    success: true,
    message: "Category updated successfully",
    category: updated,
  });
};

export const deleteCategory = async (req: Request, res: Response) => {
  const category = await categoryService.getCategoryById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  await categoryService.deleteCategory(req.params.id);

  res.json({
    success: true,
    message: "Category deleted successfully",
  });
};
