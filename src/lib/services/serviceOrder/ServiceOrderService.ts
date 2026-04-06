import {
  CreateServiceOrderDto,
  ServiceOrderDto,
} from "@/lib/apiClient/generated/client";
import { apiClient } from "@/lib/apiClient/server";

export const createServiceOrder = async (
  serviceOrder: CreateServiceOrderDto,
): Promise<ServiceOrderDto> => {
  try {
    const response =
      await apiClient.serviceOrder.postServiceOrder(serviceOrder);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
