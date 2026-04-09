import {
  CreateProductCategoryDto,
  ProductCategoryDto,
} from "@/lib/apiClient/generated/client";
import { apiClient } from "@/lib/apiClient/server";

export const getProductCategories = async (): Promise<ProductCategoryDto[]> => {
  try {
    const response = await apiClient.productCategory.getProductCategories();
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductCategoryById = async (
  id: string,
): Promise<ProductCategoryDto> => {
  try {
    const response = await apiClient.productCategory.getProductCategoryById(id);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
