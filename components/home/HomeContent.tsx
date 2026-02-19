"use client";

import { Product, Category } from "@/types/product";
import { useProducts } from "@/hooks/useProducts";
import HeroSection from "./HeroSection";
import SearchAndFilters from "./SearchAndFilters";
import ProductGrid from "./ProductGrid";
import ProductGridSkeleton from "./ProductGridSkeleton";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface HomeContentProps {
    initialProducts: Product[];
    initialTotal: number;
    categories: Category[];
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default function HomeContent({
    initialProducts,
    initialTotal,
    categories,
}: HomeContentProps) {
    const {
        products,
        loading,
        error,
        filters,
        setFilters,
        page,
        setPage,
        totalPages,
        totalProducts,
    } = useProducts({
        initialProducts,
        initialTotal,
        categories,
        syncWithUrl: true,
    });

    return (
        <>
            <HeroSection />

            <section
                id="products"
                className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
            >
                {/* Section header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                        Our Products
                    </h2>
                    <p className="mt-1 text-sm text-stone-500">
                        {totalProducts} products available
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8">
                    <SearchAndFilters
                        categories={categories}
                        filters={filters}
                        onFilterChange={(newFilters) => {
                            setFilters(newFilters);
                            setPage(1); // Reset page on filter change
                        }}
                    />
                </div>

                {/* Error state */}
                {error && (
                    <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                        {error}
                    </div>
                )}

                {/* Product grid */}
                {loading ? (
                    <ProductGridSkeleton />
                ) : (
                    <ProductGrid products={products} />
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-10 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#products"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (page > 1) {
                                                setPage(page - 1);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }
                                        }}
                                        className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                                    let pageNum: number;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (page <= 3) {
                                        pageNum = i + 1;
                                    } else if (page >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = page - 2 + i;
                                    }
                                    return (
                                        <PaginationItem key={pageNum}>
                                            <PaginationLink
                                                href="#products"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setPage(pageNum);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                isActive={page === pageNum}
                                                className="cursor-pointer"
                                            >
                                                {pageNum}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#products"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (page < totalPages) {
                                                setPage(page + 1);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }
                                        }}
                                        className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </section>
        </>
    );
}
