"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import { toast } from "sonner";

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

    // Initialize from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("wishlist");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setWishlist(parsed);
                }
            } catch (e) {
                console.error("Failed to parse wishlist from localStorage", e);
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
        const exists = wishlist.some((p) => p.id === product.id);
        if (exists) return;

        setWishlist((prev) => [...prev, product]);
        toast.success(`${product.title} added to favorites`);
    }, [wishlist]);

    const removeFromWishlist = useCallback((productId: number) => {
        const product = wishlist.find((p) => p.id === productId);
        if (!product) return;

        setWishlist((prev) => prev.filter((p) => p.id !== productId));
        toast.info(`${product.title} removed from wishlist`);
    }, [wishlist]);

    const toggleWishlist = useCallback((product: Product) => {
        const exists = wishlist.some((p) => p.id === product.id);
        if (exists) {
            setWishlist((prev) => prev.filter((p) => p.id !== product.id));
            toast.info(`${product.title} removed from favorites`);
        } else {
            setWishlist((prev) => [...prev, product]);
            toast.success(`${product.title} added to favorites`);
        }
    }, [wishlist]);

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
