"use client";

import { useState, useEffect, useCallback } from "react";
import { Product, ProductsResponse, Category } from "@/types/product";
import { getProducts, searchProducts, getProductsByCategory } from "@/services/productService";
import { useDebounce } from "./useDebounce";

interface UseProductsOptions {
    initialProducts?: Product[];
    initialTotal?: number;
    categories?: Category[];
}

interface Filters {
    search: string;
    category: string;
    sortBy: string;
    order: "asc" | "desc";
    minPrice: number;
    maxPrice: number;
}

const PRODUCTS_PER_PAGE = 12;

export function useProducts(options: UseProductsOptions = {}) {
    const [products, setProducts] = useState<Product[]>(
        options.initialProducts || []
    );
    const [totalProducts, setTotalProducts] = useState(
        options.initialTotal || 0
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<Filters>({
        search: "",
        category: "",
        sortBy: "title",
        order: "asc",
        minPrice: 0,
        maxPrice: 10000,
    });

    const debouncedSearch = useDebounce(filters.search, 400);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const skip = (page - 1) * PRODUCTS_PER_PAGE;
            let result: ProductsResponse;

            const params = {
                limit: PRODUCTS_PER_PAGE,
                skip,
                sortBy: filters.sortBy,
                order: filters.order,
            };

            if (debouncedSearch) {
                result = await searchProducts(debouncedSearch, params);
            } else if (filters.category) {
                result = await getProductsByCategory(filters.category, params);
            } else {
                result = await getProducts(params);
            }

            // Client-side price filter
            let filtered = result.products;
            if (filters.minPrice > 0 || filters.maxPrice < 10000) {
                filtered = filtered.filter(
                    (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
                );
            }

            setProducts(filtered);
            setTotalProducts(result.total);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to fetch products"
            );
        } finally {
            setLoading(false);
        }
    }, [debouncedSearch, filters.category, filters.sortBy, filters.order, filters.minPrice, filters.maxPrice, page]);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, filters.category, filters.sortBy, filters.order, filters.minPrice, filters.maxPrice]);

    // Fetch on filter/page change (skip initial if we have SSR data)
    useEffect(() => {
        const isInitialLoad =
            page === 1 &&
            !debouncedSearch &&
            !filters.category &&
            options.initialProducts?.length;

        if (!isInitialLoad) {
            fetchProducts();
        }
    }, [fetchProducts, page, debouncedSearch, filters.category, options.initialProducts?.length]);

    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

    return {
        products,
        loading,
        error,
        filters,
        setFilters,
        page,
        setPage,
        totalProducts,
        totalPages,
    };
}
