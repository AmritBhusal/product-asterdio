import { NextResponse } from "next/server";

const API_BASE_URL = process.env.BASE_URL;

export async function GET() {
    try {
        const apiUrl = `${API_BASE_URL}/products/categories`;

        const response = await fetch(apiUrl, {
            headers: { Accept: "application/json" },
        });

        if (!response.ok) {
            console.error("Upstream API error:", response.status, response.statusText);
            return NextResponse.json(
                { error: "Failed to fetch categories" },
                { status: 502 }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("API Error:", error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}
