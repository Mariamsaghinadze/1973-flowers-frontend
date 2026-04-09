/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type ProductCategoriesDto = ProductCategoryDto[];

export interface ProductCategoryDto {
  /** @minLength 1 */
  id: string;
  name: LocalizedValue;
  shortDescription?: LocalizedHTMLValue;
}

export interface LocalizedValue {
  /** @maxLength 300 */
  en?: string | null;
  /** @maxLength 300 */
  ka?: string | null;
}

export interface LocalizedHTMLValue {
  en?: string | null;
  ka?: string | null;
}

export interface GenericErrorResponse {
  error: string;
}

export interface CreateProductCategoryDto {
  name: LocalizedValue;
  shortDescription?: LocalizedHTMLValue;
}

export interface UpdateProductCategoryDto {
  name?: LocalizedValue;
  shortDescription?: LocalizedHTMLValue;
}

/** This endpoint does not need a body. Just send an empty object */
export type EmptyBody = object;

export type ProductsDto = ProductDto[];

export interface ProductDto {
  id: string;
  name: LocalizedValue;
  /**
   * @min 0
   * @exclusiveMin true
   */
  sortOrder: number;
  categoryIds: string[];
  price: number;
  description: LocalizedHTMLValue;
  images: string[];
  active: boolean;
}

export interface FindProductsByIdsDto {
  productIds: string[];
}

export interface CreateProductDto {
  name: LocalizedValue;
  /**
   * @min 0
   * @exclusiveMin true
   */
  sortOrder: number;
  categoryIds: string[];
  price: number;
  description: LocalizedHTMLValue;
  images: string[];
}

export interface UpdateProductDto {
  name?: LocalizedValue;
  /**
   * @min 0
   * @exclusiveMin true
   */
  sortOrder?: number;
  categoryIds?: string[];
  price?: number;
  description?: LocalizedHTMLValue;
  images?: string[];
  active?: boolean;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title 1973Flowers-backend
 * @version 0.0.1
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  productCategory = {
    /**
     * @description Wow
     *
     * @name GetProductCategories
     * @request GET:/productCategory
     * @response `200` `ProductCategoriesDto` Response
     * @response `400` `GenericErrorResponse` Invalid input
     * @response `500` `GenericErrorResponse` Server error
     */
    getProductCategories: (params: RequestParams = {}) =>
      this.request<ProductCategoriesDto, GenericErrorResponse>({
        path: `/productCategory`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Wow
     *
     * @name PostProductCategory
     * @request POST:/productCategory
     * @response `200` `ProductCategoryDto` Response
     * @response `400` `GenericErrorResponse` Invalid input
     * @response `500` `GenericErrorResponse` Server error
     */
    postProductCategory: (
      data: CreateProductCategoryDto,
      params: RequestParams = {},
    ) =>
      this.request<ProductCategoryDto, GenericErrorResponse>({
        path: `/productCategory`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Wow
     *
     * @name GetProductCategoryById
     * @request GET:/productCategory/{id}
     * @response `200` `ProductCategoryDto` Response
     * @response `400` `GenericErrorResponse` Invalid input
     * @response `500` `GenericErrorResponse` Server error
     */
    getProductCategoryById: (id?: string | null, params: RequestParams = {}) =>
      this.request<ProductCategoryDto, GenericErrorResponse>({
        path: `/productCategory/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Wow
     *
     * @name PatchProductCategoryById
     * @request PATCH:/productCategory/{id}
     * @response `200` `ProductCategoryDto` Response
     * @response `400` `GenericErrorResponse` Invalid input
     * @response `500` `GenericErrorResponse` Server error
     */
    patchProductCategoryById: (
      data: UpdateProductCategoryDto,
      id?: string | null,
      params: RequestParams = {},
    ) =>
      this.request<ProductCategoryDto, GenericErrorResponse>({
        path: `/productCategory/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Wow
     *
     * @name DeleteProductCategoryById
     * @request DELETE:/productCategory/{id}
     * @response `200` `ProductCategoryDto` Response
     * @response `400` `GenericErrorResponse` Invalid input
     * @response `500` `GenericErrorResponse` Server error
     */
    deleteProductCategoryById: (
      data: EmptyBody,
      id?: string | null,
      params: RequestParams = {},
    ) =>
      this.request<ProductCategoryDto, GenericErrorResponse>({
        path: `/productCategory/${id}`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  product = {
    /**
     * @description Wow
     *
     * @name GetProducts
     * @request GET:/product
     * @response `200` `ProductsDto` Response
     * @response `400` `GenericErrorResponse` Invalid input
     * @response `500` `GenericErrorResponse` Server error
     */
    getProducts: (params: RequestParams = {}) =>
      this.request<ProductsDto, GenericErrorResponse>({
        path: `/product`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Wow
     *
     * @name PostProduct
     * @request POST:/product
     * @response `200` `ProductDto` Response
     * @response `400` `GenericErrorResponse` Invalid input
     * @response `500` `GenericErrorResponse` Server error
     */
    postProduct: (data: CreateProductDto, params: RequestParams = {}) =>
      this.request<ProductDto, GenericErrorResponse>({
        path: `/product`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Wow
     *
     * @name GetProductById
     * @request GET:/product/{id}
     * @response `200` `ProductDto` Response
     * @response `400` `GenericErrorResponse` Invalid input
     * @response `500` `GenericErrorResponse` Server error
     */
    getProductById: (id?: string | null, params: RequestParams = {}) =>
      this.request<ProductDto, GenericErrorResponse>({
        path: `/product/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Wow
     *
     * @name PatchProductById
     * @request PATCH:/product/{id}
     * @response `200` `ProductDto` Response
     * @response `400` `GenericErrorResponse` Invalid input
     * @response `500` `GenericErrorResponse` Server error
     */
    patchProductById: (
      data: UpdateProductDto,
      id?: string | null,
      params: RequestParams = {},
    ) =>
      this.request<ProductDto, GenericErrorResponse>({
        path: `/product/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Wow
     *
     * @name DeleteProductById
     * @request DELETE:/product/{id}
     * @response `200` `ProductDto` Response
     * @response `400` `GenericErrorResponse` Invalid input
     * @response `500` `GenericErrorResponse` Server error
     */
    deleteProductById: (
      data: EmptyBody,
      id?: string | null,
      params: RequestParams = {},
    ) =>
      this.request<ProductDto, GenericErrorResponse>({
        path: `/product/${id}`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Wow
     *
     * @name FindProductsByIds
     * @request POST:/product/findByIds
     * @response `200` `ProductsDto` Response
     * @response `400` `GenericErrorResponse` Invalid input
     * @response `500` `GenericErrorResponse` Server error
     */
    findProductsByIds: (
      data: FindProductsByIdsDto,
      params: RequestParams = {},
    ) =>
      this.request<ProductsDto, GenericErrorResponse>({
        path: `/product/findByIds`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
