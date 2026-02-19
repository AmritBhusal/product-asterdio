import { Category } from "@/types/product";

const isServer = typeof window === "undefined";
const BASE = isServer ? process.env.BASE_URL! : "";
const API_PATH = isServer ? "/products/categories" : "/api/categories";

export async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${BASE}${API_PATH}`);
    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
}
