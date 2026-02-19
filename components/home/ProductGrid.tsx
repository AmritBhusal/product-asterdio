import ProductCard from "@/components/shared/ProductCard";
import { Product } from "@/types/product";
import { PackageSearch } from "lucide-react";

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <PackageSearch className="h-16 w-16 text-stone-300" />
                <h3 className="mt-4 text-lg font-semibold text-stone-700">
                    No products found
                </h3>
                <p className="mt-1 text-sm text-stone-500">
                    Try adjusting your search or filter criteria
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
