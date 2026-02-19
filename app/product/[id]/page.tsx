import { getProduct, getProducts } from "@/services/productService";
import { Product } from "@/types/product";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductSpecs from "@/components/product/ProductSpecs";
import ProductReviews from "@/components/product/ProductReviews";

export { generateMetadata } from "./metadata";

export const revalidate = 3600;

export async function generateStaticParams() {
    const data = await getProducts({ limit: 20 });
    return data.products.map((product) => ({
        id: product.id.toString(),
    }));
}

export default async function ProductDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    let product: Product;

    try {
        product = await getProduct(id);
    } catch (error) {
        console.error("Error fetching product:", error);
        return notFound();
    }

    if (!product) return notFound();

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
                {/* Back */}
                <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-900 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                </Link>

                {/* Main Grid: Gallery + Info */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                    <ProductGallery product={product} />
                    <ProductInfo product={product} />
                </div>

                {/* Details Section: Specs + Reviews */}
                <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
                    <ProductSpecs product={product} />
                    <ProductReviews reviews={product.reviews} rating={product.rating} />
                </div>
            </div>
        </div>
    );
}
