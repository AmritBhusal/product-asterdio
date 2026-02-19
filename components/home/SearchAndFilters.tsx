"use client";

import { Search, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/product";
import { useState } from "react";
import FilterContent from "./FilterContent";

interface SearchAndFiltersProps {
    categories: Category[];
    filters: {
        search: string;
        category: string;
        sortBy: string;
        order: "asc" | "desc";
        minPrice: number;
        maxPrice: number;
    };
    onFilterChange: (filters: SearchAndFiltersProps["filters"]) => void;
}

export default function SearchAndFilters({
    categories,
    filters,
    onFilterChange,
}: SearchAndFiltersProps) {
    const [open, setOpen] = useState(false);

    const updateFilter = (key: string, value: string | number) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const resetFilters = () => {
        onFilterChange({
            search: filters.search, // Keep search
            category: "",
            sortBy: "title",
            order: "asc",
            minPrice: 0,
            maxPrice: 2000,
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <Input
                        placeholder="Search products..."
                        value={filters.search}
                        onChange={(e) => updateFilter("search", e.target.value)}
                        className="h-12 rounded-xl border-stone-200 bg-white pl-10 text-sm shadow-sm transition-all focus:border-stone-400 focus:ring-0 sm:h-11"
                    />
                    {filters.search && (
                        <button
                            onClick={() => updateFilter("search", "")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Desktop Filters (Hidden on mobile) */}
                <div className="hidden items-center gap-3 lg:flex">
                    <Select
                        value={filters.category || "all"}
                        onValueChange={(v) => updateFilter("category", v === "all" ? "" : v)}
                    >
                        <SelectTrigger className="h-11 w-48 rounded-xl cursor-pointer border-stone-200 bg-white shadow-sm">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat.slug} value={cat.slug}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={`${filters.sortBy}-${filters.order}`}
                        onValueChange={(v) => {
                            const [sortBy, order] = v.split("-");
                            onFilterChange({ ...filters, sortBy, order: order as "asc" | "desc" });
                        }}
                    >
                        <SelectTrigger className="h-11 w-44 cursor-pointer rounded-xl border-stone-200 bg-white shadow-sm">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="title-asc">Name: A-Z</SelectItem>
                            <SelectItem value="title-desc">Name: Z-A</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            <SelectItem value="rating-desc">Top Rated</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Filter Toggle (Always visible, triggers Sheet on mobile) */}
                <div className="flex items-center gap-2">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                className="h-12 flex-1 cursor-pointer rounded-xl border-stone-200 bg-white px-4 text-stone-600 hover:bg-stone-50 lg:h-11 lg:flex-none"
                            >
                                <SlidersHorizontal className="mr-2 h-4 w-4" />
                                Filters
                                {(filters.category || filters.minPrice > 0 || filters.maxPrice < 2000) && (
                                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white">
                                        !
                                    </span>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] p-2 sm:w-[400px]">
                            <SheetHeader className="border-b pb-4">
                                <SheetTitle>Filters</SheetTitle>
                                <SheetDescription>
                                    Refine your product search
                                </SheetDescription>
                            </SheetHeader>
                            <FilterContent
                                categories={categories}
                                filters={filters}
                                updateFilter={updateFilter}
                                onFilterChange={onFilterChange}
                            />
                            <SheetFooter className="absolute bottom-0 left-0 w-full border-t bg-white p-6">
                                <div className="flex w-full gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={resetFilters}
                                        className="flex-1 rounded-xl"
                                    >
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Reset
                                    </Button>
                                    <Button
                                        onClick={() => setOpen(false)}
                                        className="flex-1 rounded-xl bg-stone-900 hover:bg-stone-800"
                                    >
                                        Show Results
                                    </Button>
                                </div>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
}
