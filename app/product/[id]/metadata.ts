import type { Metadata } from "next";
import { getProduct } from "@/services/productService";

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    const { id } = await params;
    try {
        const product = await getProduct(id);
        const discountedPrice =
            product.price - (product.price * product.discountPercentage) / 100;
        return {
            title: `${product.title} — Luxe`,
            description: product.description,
            openGraph: {
                title: product.title,
                description: product.description,
                images: [{ url: product.thumbnail, alt: product.title }],
            },
            twitter: {
                card: "summary_large_image",
                title: `${product.title} — $${discountedPrice.toFixed(2)}`,
                description: product.description,
                images: [product.thumbnail],
            },
        };
    } catch {
        return { title: "Product Not Found — Luxe" };
    }
}
