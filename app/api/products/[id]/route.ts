import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = process.env.BASE_URL;

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const apiUrl = `${API_BASE_URL}/products/${id}`;

        const response = await axios.get(apiUrl, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(response.data);
    } catch (error: unknown) {
        const axiosError = error as { response?: { data?: unknown; status?: number }; message?: string };
        console.error("API Error (Single Product):", axiosError.response?.data || axiosError.message);
        return NextResponse.json(
            { error: "Failed to fetch product", details: axiosError.response?.data },
            { status: axiosError.response?.status || 500 }
        );
    }
}
