import type { MetadataRoute } from "next";
import { getProducts } from "@/services/productService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const data = await getProducts({ limit: 100 });
    const productEntries: MetadataRoute.Sitemap = data.products.map((product) => ({
        url: `${baseUrl}/product/${product.id}`,
        lastModified: product.meta?.updatedAt
            ? new Date(product.meta.updatedAt)
            : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/favorites`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.3,
        },
        ...productEntries,
    ];
}
