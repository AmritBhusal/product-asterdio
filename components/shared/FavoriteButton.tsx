"use client";

import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/button";

interface FavoriteButtonProps {
    product: Product;
    showLabel?: boolean;
}

export default function FavoriteButton({ product, showLabel = true }: FavoriteButtonProps) {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isFavorite = isInWishlist(product.id);

    return (
        <Button
            variant={isFavorite ? "default" : "outline"}
            size="lg"
            onClick={() => toggleWishlist(product)}
            className={`gap-2 rounded-xl transition-all active:scale-95 ${isFavorite
                    ? "bg-rose-500 hover:bg-rose-600 border-rose-500"
                    : "hover:bg-stone-50 border-stone-200 text-stone-700"
                }`}
        >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-white text-white" : ""}`} />
            {showLabel && (isFavorite ? "Saved to Favorites" : "Add to Favorites")}
        </Button>
    );
}
