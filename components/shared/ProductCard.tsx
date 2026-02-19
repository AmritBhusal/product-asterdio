"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/types/product";
import StarRating from "./StarRating";
import { useWishlist } from "@/hooks/useWishlist";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);
    const [imageError, setImageError] = useState(false);

    const discountedPrice =
        product.price - (product.price * product.discountPercentage) / 100;

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50">
            {/* Wishlist toggle */}
            <button
                onClick={() => toggleWishlist(product)}
                className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
                aria-label={isWishlisted ? "Remove from favorites" : "Add to favorites"}
            >
                <Heart
                    className={`h-4 w-4 transition-colors ${isWishlisted
                        ? "fill-rose-500 text-rose-500"
                        : "text-stone-400 hover:text-rose-400"
                        }`}
                />
            </button>

            {/* Discount badge */}
            {product.discountPercentage > 0 && (
                <div className="absolute left-3 top-3 z-10 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                    -{Math.round(product.discountPercentage)}%
                </div>
            )}

            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-stone-100 flex items-center justify-center">
                {(!product.images?.[0] && !product.thumbnail) || imageError ? (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                        <span className="text-xs font-medium text-stone-400">Image not found</span>
                    </div>
                ) : (
                    <Image
                        src={product.images?.[0] || product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        quality={90}
                        onError={() => setImageError(true)}
                    />
                )}
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-2">
                {product.brand && (
                    <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                        {product.brand}
                    </p>
                )}
                <h3 className="line-clamp-1 text-sm font-semibold text-stone-800 transition-colors group-hover:text-emerald-700">
                    {product.title}
                </h3>

                <StarRating rating={product.rating} size={12} />

                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-stone-900">
                        ${discountedPrice.toFixed(2)}
                    </span>
                    {product.discountPercentage > 0 && (
                        <span className="text-sm text-stone-400 line-through">
                            ${product.price.toFixed(2)}
                        </span>
                    )}
                </div>

                <div className="mt-4 flex gap-2">
                    <Link
                        href={`/product/${product.id}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-xs font-semibold text-stone-700 transition-all hover:bg-stone-50 active:scale-95"
                    >
                        <Eye className="h-4 w-4" />
                        View
                    </Link>
                    <button className="flex flex-[1.5] cursor-pointer items-center justify-center gap-2 rounded-xl bg-stone-900 px-3 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-emerald-700 active:scale-95">
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
