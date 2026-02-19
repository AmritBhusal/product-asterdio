"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { z } from "zod/v4";

// Zod schema for validating wishlist data from localStorage
const wishlistItemSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    price: z.number(),
    discountPercentage: z.number(),
    rating: z.number(),
    stock: z.number(),
    tags: z.array(z.string()),
    brand: z.string().optional(),
    sku: z.string(),
    weight: z.number(),
    dimensions: z.object({
        width: z.number(),
        height: z.number(),
        depth: z.number(),
    }),
    warrantyInformation: z.string(),
    shippingInformation: z.string(),
    availabilityStatus: z.string(),
    reviews: z.array(z.object({
        rating: z.number(),
        comment: z.string(),
        date: z.string(),
        reviewerName: z.string(),
        reviewerEmail: z.string(),
    })),
    returnPolicy: z.string(),
    minimumOrderQuantity: z.number(),
    meta: z.object({
        createdAt: z.string(),
        updatedAt: z.string(),
        barcode: z.string(),
        qrCode: z.string(),
    }),
    images: z.array(z.string()),
    thumbnail: z.string(),
});

const wishlistSchema = z.array(wishlistItemSchema);

interface WishlistContextType {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number) => void;
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: number) => boolean;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize from localStorage with Zod validation
    useEffect(() => {
        const saved = localStorage.getItem("wishlist");
        if (saved) {
            try {
                const raw = JSON.parse(saved);
                const parsed = wishlistSchema.safeParse(raw);
                if (parsed.success) {
                    setWishlist(parsed.data as Product[]);
                } else {
                    console.warn("Invalid wishlist data in localStorage, resetting.");
                    localStorage.removeItem("wishlist");
                }
            } catch (e) {
                console.error("Failed to parse wishlist from localStorage", e);
                localStorage.removeItem("wishlist");
            }
        }
        setIsInitialized(true);
    }, []);

    // Persist to localStorage - only after initialization to avoid overwriting with empty array
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }
    }, [wishlist, isInitialized]);

    const addToWishlist = useCallback((product: Product) => {
        setWishlist((prev) => {
            if (prev.some((p) => p.id === product.id)) return prev;
            toast.success(`${product.title} added to favorites`);
            return [...prev, product];
        });
    }, []);

    const removeFromWishlist = useCallback((productId: number) => {
        setWishlist((prev) => {
            const product = prev.find((p) => p.id === productId);
            if (!product) return prev;
            toast.info(`${product.title} removed from wishlist`);
            return prev.filter((p) => p.id !== productId);
        });
    }, []);

    const toggleWishlist = useCallback((product: Product) => {
        setWishlist((prev) => {
            const exists = prev.some((p) => p.id === product.id);
            if (exists) {
                toast.info(`${product.title} removed from favorites`);
                return prev.filter((p) => p.id !== product.id);
            } else {
                toast.success(`${product.title} added to favorites`);
                return [...prev, product];
            }
        });
    }, []);

    const isInWishlist = useCallback((productId: number) => {
        return wishlist.some((p) => p.id === productId);
    }, [wishlist]);

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}
