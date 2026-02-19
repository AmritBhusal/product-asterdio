"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import FavoriteButton from "@/components/shared/FavoriteButton";

interface ProductGalleryProps {
    product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
    const [mainImage, setMainImage] = useState(product.images[0] || product.thumbnail);

    return (
        <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-50">
                <Image
                    src={mainImage}
                    alt={product.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                />
                <div className="absolute right-3 top-3 z-10">
                    <FavoriteButton product={product} />
                </div>
            </div>

            {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {product.images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setMainImage(img)}
                            className={`relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${mainImage === img
                                    ? "border-stone-900 opacity-100"
                                    : "border-transparent opacity-60 hover:opacity-100"
                                } bg-stone-50`}
                        >
                            <Image
                                src={img}
                                alt={`${product.title} view ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
