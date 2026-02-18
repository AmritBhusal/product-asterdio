import { NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = process.env.BASE_URL;

export async function GET() {
    try {
        const apiUrl = `${API_BASE_URL}/products/categories`;

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
            { error: "Failed to fetch categories", details: axiosError.response?.data },
            { status: axiosError.response?.status || 500 }
        );
    }
}
