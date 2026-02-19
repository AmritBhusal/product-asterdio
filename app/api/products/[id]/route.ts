import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";

const API_BASE_URL = process.env.BASE_URL;

const productIdSchema = z.object({
    id: z.string().regex(/^\d+$/, "Product ID must be a number"),
});

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const parsed = productIdSchema.safeParse({ id });

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid product ID" },
                { status: 400 }
            );
        }

        const apiUrl = `${API_BASE_URL}/products/${parsed.data.id}`;

        const response = await fetch(apiUrl, {
            headers: { Accept: "application/json" },
        });

        if (!response.ok) {
            console.error("Upstream API error:", response.status, response.statusText);
            return NextResponse.json(
                { error: "Failed to fetch product" },
                { status: response.status === 404 ? 404 : 502 }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("API Error (Single Product):", error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}
