import { Skeleton } from "@/components/ui/skeleton";

export default function ProductGridSkeleton({ count = 12 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-sm"
                >
                    <Skeleton className="aspect-square w-full" />
                    <div className="space-y-3 p-4">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-10 w-full rounded-xl" />
                    </div>
                </div>
            ))}
        </div>
    );
}
