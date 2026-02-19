"use client";

import { useWishlist } from "@/hooks/useWishlist";
import ProductCard from "@/components/shared/ProductCard";
import Link from "next/link";
import { Product } from "@/types/product";
import { Heart, ArrowLeft } from "lucide-react";

export default function FavoritesPage() {
    const { wishlist } = useWishlist();

    return (
        <div className="min-h-screen bg-stone-50/50 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
                            Your Favorites
                        </h1>
                        <p className="mt-1 text-sm text-stone-500">
                            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Shop
                    </Link>
                </div>

                {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-200 bg-white py-20 text-center">
                        <div className="mb-4 rounded-full bg-stone-50 p-4">
                            <Heart className="h-8 w-8 text-stone-300" />
                        </div>
                        <h2 className="text-xl font-semibold text-stone-900">
                            Your favorites is empty
                        </h2>
                        <p className="mt-2 text-stone-500">
                            Explore our collection and save items you love for later.
                        </p>
                        <Link
                            href="/"
                            className="mt-8 rounded-xl bg-stone-900 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-stone-800 active:scale-95"
                        >
                            Explore Collection
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {wishlist.map((product: Product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
