import { Review } from "@/types/product";
import { Star } from "lucide-react";

interface ProductReviewsProps {
    reviews: Review[];
    rating: number;
}

function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function ProductReviews({ reviews, rating }: ProductReviewsProps) {
    return (
        <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-stone-900">Reviews</h2>
                <div className="flex items-center gap-1.5 text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-stone-900">{rating}</span>
                    <span className="text-stone-400">· {reviews?.length || 0}</span>
                </div>
            </div>

            <div className="space-y-4">
                {reviews?.map((review, i) => (
                    <div key={i} className="rounded-xl border border-stone-100 p-5 transition-colors hover:border-stone-200">
                        <div className="flex gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-bold text-stone-600">
                                {getInitials(review.reviewerName)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className="text-sm font-semibold text-stone-900 truncate">{review.reviewerName}</span>
                                    <span className="text-[10px] text-stone-400 shrink-0">
                                        {new Date(review.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex gap-0.5 mb-2">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <Star key={j} className={`h-3 w-3 ${j < review.rating ? "fill-amber-400 text-amber-400" : "fill-stone-100 text-stone-100"}`} />
                                    ))}
                                </div>
                                <p className="text-sm text-stone-600">{review.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {(!reviews || reviews.length === 0) && (
                    <div className="rounded-xl border-2 border-dashed border-stone-200 py-12 text-center">
                        <p className="text-sm text-stone-400">No reviews yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
