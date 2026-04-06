import { Api, ApiConfig } from "./generated/client";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.slr.ge";
console.log(`BASE_URL=${BASE_URL}`);

// Shared util between client/server
export const makeAPI = (options: ApiConfig = {}) => {
  const finalConfig = {
    baseURL: BASE_URL,
    ...options,
  };

  return new Api(finalConfig);
};

export const apiClient = makeAPI();
