"use client";

import { Category } from "@/types/product";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface FilterContentProps {
    categories: Category[];
    filters: {
        category: string;
        sortBy: string;
        order: "asc" | "desc";
        minPrice: number;
        maxPrice: number;
    };
    updateFilter: (key: string, value: string | number) => void;
    onFilterChange: (filters: any) => void;
}

export default function FilterContent({
    categories,
    filters,
    updateFilter,
    onFilterChange,
}: FilterContentProps) {
    return (
        <div className="space-y-6 py-4">
            {/* Category */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-stone-900">Category</label>
                <Select
                    value={filters.category || "all"}
                    onValueChange={(v) => updateFilter("category", v === "all" ? "" : v)}
                >
                    <SelectTrigger className="h-11 w-full cursor-pointer rounded-xl border-stone-200 bg-white shadow-sm">
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
            </div>

            {/* Sort */}
            <div className="space-y-2 ">
                <label className="text-sm font-semibold text-stone-900">Sort By</label>
                <Select
                    value={`${filters.sortBy}-${filters.order}`}
                    onValueChange={(v) => {
                        const [sortBy, order] = v.split("-");
                        onFilterChange({ ...filters, sortBy, order: order as "asc" | "desc" });
                    }}
                >
                    <SelectTrigger className="h-11 w-full cursor-pointer rounded-xl border-stone-200 bg-white shadow-sm">
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

            {/* Price Range */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-stone-900">Price Range</label>
                    <span className="text-sm font-medium text-stone-500">
                        ${filters.minPrice} — ${filters.maxPrice}
                    </span>
                </div>
                <div className="px-2">
                    <Slider
                        min={0}
                        max={2000}
                        step={10}
                        value={[filters.minPrice, filters.maxPrice]}
                        onValueChange={([min, max]) =>
                            onFilterChange({ ...filters, minPrice: min, maxPrice: max })
                        }
                        className="py-4 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
}
