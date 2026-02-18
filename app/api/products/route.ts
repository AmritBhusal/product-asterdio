import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = process.env.BASE_URL;

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const search = searchParams.get("search") || "";
        const category = searchParams.get("category") || "";
        const limit = searchParams.get("limit") || "12";
        const skip = searchParams.get("skip") || "0";
        const sortBy = searchParams.get("sortBy") || "";
        const order = searchParams.get("order") || "asc";

        let apiUrl: string;

        if (search) {
            // Search products
            apiUrl = `${API_BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
        } else if (category) {
            // Filter by category
            apiUrl = `${API_BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
        } else {
            // Get all products
            apiUrl = `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`;
        }

        // Append sort params if provided
        if (sortBy) {
            apiUrl += `&sortBy=${sortBy}&order=${order}`;
        }

        const response = await axios.get(apiUrl, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(response.data);
    } catch (error: unknown) {
        const axiosError = error as { response?: { data?: unknown; status?: number }; message?: string };
        console.error("API Error:", axiosError.response?.data || axiosError.message);
        return NextResponse.json(
            { error: "Failed to fetch products", details: axiosError.response?.data },
            { status: axiosError.response?.status || 500 }
        );
    }
}
