import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";

const API_BASE_URL = process.env.BASE_URL;

const productsQuerySchema = z.object({
    search: z.string().max(200).optional().default(""),
    category: z.string().max(100).optional().default(""),
    limit: z.coerce.number().int().min(1).max(100).optional().default(12),
    skip: z.coerce.number().int().min(0).optional().default(0),
    sortBy: z.enum(["title", "price", "rating", ""]).optional().default(""),
    order: z.enum(["asc", "desc"]).optional().default("asc"),
});

export async function GET(request: NextRequest) {
    try {
        const raw = Object.fromEntries(request.nextUrl.searchParams.entries());
        const parsed = productsQuerySchema.safeParse(raw);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid query parameters" },
                { status: 400 }
            );
        }

        const { search, category, limit, skip, sortBy, order } = parsed.data;

        let apiUrl: string;

        if (search) {
            apiUrl = `${API_BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
        } else if (category) {
            apiUrl = `${API_BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
        } else {
            apiUrl = `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`;
        }

        if (sortBy) {
            apiUrl += `&sortBy=${sortBy}&order=${order}`;
        }

        const response = await fetch(apiUrl, {
            headers: { Accept: "application/json" },
        });

        if (!response.ok) {
            console.error("Upstream API error:", response.status, response.statusText);
            return NextResponse.json(
                { error: "Failed to fetch products" },
                { status: 502 }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("API Error:", error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
