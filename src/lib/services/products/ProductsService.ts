import {
  CreateProductCategoryDto,
  FindProductsByIdsDto,
  ProductCategoryDto,
  ProductDto,
} from "@/lib/apiClient/generated/client";
import { apiClient } from "@/lib/apiClient/server";

export const getProductsByIds = async (
  productIds: FindProductsByIdsDto,
): Promise<ProductDto[]> => {
  try {
    const response = await apiClient.product.findProductsByIds(productIds);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
