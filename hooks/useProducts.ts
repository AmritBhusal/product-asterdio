import { useState, useEffect, useCallback, useRef } from "react";
import { Product, ProductsResponse, Category } from "@/types/product";
import { getProducts, searchProducts, getProductsByCategory } from "@/services/productService";
import { useDebounce } from "./useDebounce";
import { useRouter, useSearchParams } from "next/navigation";

interface UseProductsOptions {
    initialProducts?: Product[];
    initialTotal?: number;
    categories?: Category[];
    syncWithUrl?: boolean;
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
    const router = useRouter();
    const searchParams = useSearchParams();
    const isInitialMount = useRef(true);

    const [products, setProducts] = useState<Product[]>(
        options.initialProducts || []
    );
    const [totalProducts, setTotalProducts] = useState(
        options.initialTotal || 0
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get initial state from URL or options
    const getInitialPage = () => {
        if (options.syncWithUrl) {
            return Number(searchParams.get("page")) || 1;
        }
        return 1;
    };

    const getInitialFilters = (): Filters => {
        if (options.syncWithUrl) {
            return {
                search: searchParams.get("search") || "",
                category: searchParams.get("category") || "",
                sortBy: searchParams.get("sort") || "title",
                order: (searchParams.get("order") as "asc" | "desc") || "asc",
                minPrice: Number(searchParams.get("minPrice")) || 0,
                maxPrice: Number(searchParams.get("maxPrice")) || 2000,
            };
        }
        return {
            search: "",
            category: "",
            sortBy: "title",
            order: "asc",
            minPrice: 0,
            maxPrice: 2000,
        };
    };

    const [page, setPage] = useState(getInitialPage);
    const [filters, setFilters] = useState<Filters>(getInitialFilters);

    const debouncedSearch = useDebounce(filters.search, 400);

    // Update URL when filters or page change
    useEffect(() => {
        if (!options.syncWithUrl) return;

        // Skip the very first run to avoid redundant push if URL is already correct
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const params = new URLSearchParams();
        if (debouncedSearch) params.set("search", debouncedSearch);
        if (filters.category) params.set("category", filters.category);
        if (filters.sortBy !== "title") params.set("sort", filters.sortBy);
        if (filters.order !== "asc") params.set("order", filters.order);
        if (filters.minPrice > 0) params.set("minPrice", filters.minPrice.toString());
        if (filters.maxPrice < 2000) params.set("maxPrice", filters.maxPrice.toString());
        if (page > 1) params.set("page", page.toString());

        router.push(`/?${params.toString()}`, { scroll: false });
    }, [debouncedSearch, filters.category, filters.sortBy, filters.order, filters.minPrice, filters.maxPrice, page, options.syncWithUrl, router]);

    // Update local state when URL changes (e.g. back button)
    useEffect(() => {
        if (!options.syncWithUrl) return;

        const urlPage = Number(searchParams.get("page")) || 1;
        const urlSearch = searchParams.get("search") || "";
        const urlCategory = searchParams.get("category") || "";
        const urlSort = searchParams.get("sort") || "title";
        const urlOrder = (searchParams.get("order") as "asc" | "desc") || "asc";
        const urlMinPrice = Number(searchParams.get("minPrice")) || 0;
        const urlMaxPrice = Number(searchParams.get("maxPrice")) || 2000;

        setPage(urlPage);
        setFilters((prev) => ({
            ...prev,
            search: urlSearch,
            category: urlCategory,
            sortBy: urlSort,
            order: urlOrder,
            minPrice: urlMinPrice,
            maxPrice: urlMaxPrice,
        }));
    }, [searchParams, options.syncWithUrl]);

    const fetchProducts = useCallback(async (isInitial: boolean = false) => {
        // In syncWithUrl mode, the server component handles the initial load.
        if (options.syncWithUrl && isInitial) {
            return;
        }

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

            // Use useDebounce outside or pass the current search term
            // Actually, we use filters.search for the UI and debouncedSearch for fetching
            if (debouncedSearch) {
                result = await searchProducts(debouncedSearch, params);
            } else if (filters.category) {
                result = await getProductsByCategory(filters.category, params);
            } else {
                result = await getProducts(params);
            }

            // Client-side price filter
            let filtered = result.products;
            if (filters.minPrice > 0 || filters.maxPrice < 2000) {
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
    }, [debouncedSearch, filters.category, filters.sortBy, filters.order, filters.minPrice, filters.maxPrice, page, options.syncWithUrl]);

    // Initial load from props
    useEffect(() => {
        if (options.initialProducts) {
            setProducts(options.initialProducts);
        }
        if (options.initialTotal !== undefined) {
            setTotalProducts(options.initialTotal);
        }
    }, [options.initialProducts, options.initialTotal]);

    // Fetch on filter/page change
    useEffect(() => {
        // In syncWithUrl mode, the server component handles the initial load.
        // We only need to fetch if filters actually changed AFTER mount.
        if (!options.syncWithUrl) {
            fetchProducts();
        } else if (!isInitialMount.current) {
            fetchProducts();
        }
    }, [fetchProducts, options.syncWithUrl]);

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
