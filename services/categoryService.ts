import { Category } from "@/types/product";

const BASE = typeof window === "undefined"
    ? `${process.env.NEXT_PUBLIC_SITE_URL}`
    : "";

export async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${BASE}/api/categories`);
    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
}
