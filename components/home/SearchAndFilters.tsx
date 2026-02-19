"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Category } from "@/types/product";
import { useState } from "react";

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
    const [showAdvanced, setShowAdvanced] = useState(false);

    const updateFilter = (key: string, value: string | number) => {
        onFilterChange({ ...filters, [key]: value });
    };

    return (
        <div className="space-y-4">
            {/* Main row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <Input
                        placeholder="Search products..."
                        value={filters.search}
                        onChange={(e) => updateFilter("search", e.target.value)}
                        className="h-11 rounded-xl border-stone-200 bg-white pl-10 text-sm shadow-sm transition-shadow focus:shadow-md"
                    />
                    {filters.search && (
                        <button
                            onClick={() => updateFilter("search", "")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-stone-400 hover:text-stone-600"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                {/* Category */}
                <Select
                    value={filters.category}
                    onValueChange={(v) => updateFilter("category", v === "all" ? "" : v)}
                >
                    <SelectTrigger className="h-11 w-full rounded-xl border-stone-200 bg-white shadow-sm sm:w-48">
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

                {/* Sort */}
                <Select
                    value={`${filters.sortBy}-${filters.order}`}
                    onValueChange={(v) => {
                        const [sortBy, order] = v.split("-");
                        onFilterChange({ ...filters, sortBy, order: order as "asc" | "desc" });
                    }}
                >
                    <SelectTrigger className="h-11 w-full rounded-xl border-stone-200 bg-white shadow-sm sm:w-44">
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

                {/* Advanced filter toggle */}
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-medium shadow-sm transition-all ${showAdvanced
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                        }`}
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="hidden sm:inline">Filters</span>
                </button>
            </div>

            {/* Advanced filters */}
            {showAdvanced && (
                <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-stone-700">
                                Price Range
                            </label>
                            <span className="text-sm text-stone-500">
                                ${filters.minPrice} — ${filters.maxPrice}
                            </span>
                        </div>
                        <Slider
                            min={0}
                            max={2000}
                            step={10}
                            value={[filters.minPrice, filters.maxPrice]}
                            onValueChange={([min, max]) =>
                                onFilterChange({ ...filters, minPrice: min, maxPrice: max })
                            }
                            className="py-2"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
