import { ProductsResponse } from "@/types/product";

const BASE = typeof window === "undefined"
    ? `${process.env.NEXT_PUBLIC_SITE_URL }`
    : "";

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
    return fetchJson<ProductsResponse>(`${BASE}/api/products?${query}`);
}

export async function searchProducts(
    searchTerm: string,
    params: ProductParams = {}
): Promise<ProductsResponse> {
    const query = buildQuery({
        search: searchTerm,
        limit: params.limit || 20,
        skip: params.skip || 0,
        sortBy: params.sortBy,
        order: params.order,
    });
    return fetchJson<ProductsResponse>(`${BASE}/api/products?${query}`);
}

export async function getProductsByCategory(
    category: string,
    params: ProductParams = {}
): Promise<ProductsResponse> {
    const query = buildQuery({
        category,
        limit: params.limit || 20,
        skip: params.skip || 0,
        sortBy: params.sortBy,
        order: params.order,
    });
    return fetchJson<ProductsResponse>(`${BASE}/api/products?${query}`);
}
