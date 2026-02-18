import apiClient from "./axios";
import { ProductsResponse } from "@/types/product";

interface ProductParams {
    limit?: number;
    skip?: number;
    sortBy?: string;
    order?: "asc" | "desc";
    select?: string[];
}

export async function getProducts(
    params: ProductParams = {}
): Promise<ProductsResponse> {
    const { data } = await apiClient.get<ProductsResponse>("/products", {
        params: {
            limit: params.limit || 20,
            skip: params.skip || 0,
            sortBy: params.sortBy,
            order: params.order,
            select: params.select?.join(","),
        },
    });
    return data;
}

export async function searchProducts(
    query: string,
    params: ProductParams = {}
): Promise<ProductsResponse> {
    const { data } = await apiClient.get<ProductsResponse>("/products/search", {
        params: {
            q: query,
            limit: params.limit || 20,
            skip: params.skip || 0,
            sortBy: params.sortBy,
            order: params.order,
        },
    });
    return data;
}

export async function getProductsByCategory(
    category: string,
    params: ProductParams = {}
): Promise<ProductsResponse> {
    const { data } = await apiClient.get<ProductsResponse>(
        `/products/category/${category}`,
        {
            params: {
                limit: params.limit || 20,
                skip: params.skip || 0,
                sortBy: params.sortBy,
                order: params.order,
            },
        }
    );
    return data;
}
