import { Product, ProductsResponse } from "@/types/product";

const isServer = typeof window === "undefined";

const BASE = isServer ? process.env.BASE_URL! : "";
const API_PREFIX = isServer ? "/products" : "/api/products";

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

interface ProductParams {
    limit?: number;
    skip?: number;
    sortBy?: string;
    order?: "asc" | "desc";
}

function buildQuery(params: Record<string, string | number | undefined>): string {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== "") {
            search.set(key, String(value));
        }
    }
    return search.toString();
}

export async function getProducts(
    params: ProductParams = {}
): Promise<ProductsResponse> {
    const query = buildQuery({
        limit: params.limit || 20,
        skip: params.skip || 0,
        sortBy: params.sortBy,
        order: params.order,
    });
    return fetchJson<ProductsResponse>(`${BASE}${API_PREFIX}?${query}`);
}

export async function searchProducts(
    searchTerm: string,
    params: ProductParams = {}
): Promise<ProductsResponse> {
    if (isServer) {
        // Direct external API call
        const query = buildQuery({
            q: searchTerm,
            limit: params.limit || 20,
            skip: params.skip || 0,
            sortBy: params.sortBy,
            order: params.order,
        });
        return fetchJson<ProductsResponse>(`${BASE}/products/search?${query}`);
    }
    // Client-side: go through local API proxy
    const query = buildQuery({
        search: searchTerm,
        limit: params.limit || 20,
        skip: params.skip || 0,
        sortBy: params.sortBy,
        order: params.order,
    });
    return fetchJson<ProductsResponse>(`/api/products?${query}`);
}

export async function getProductsByCategory(
    category: string,
    params: ProductParams = {}
): Promise<ProductsResponse> {
    if (isServer) {
        const query = buildQuery({
            limit: params.limit || 20,
            skip: params.skip || 0,
            sortBy: params.sortBy,
            order: params.order,
        });
        return fetchJson<ProductsResponse>(`${BASE}/products/category/${encodeURIComponent(category)}?${query}`);
    }
    const query = buildQuery({
        category,
        limit: params.limit || 20,
        skip: params.skip || 0,
        sortBy: params.sortBy,
        order: params.order,
    });
    return fetchJson<ProductsResponse>(`/api/products?${query}`);
}

export async function getProduct(id: string | number): Promise<Product> {
    return fetchJson<Product>(`${BASE}${API_PREFIX}/${id}`);
}
