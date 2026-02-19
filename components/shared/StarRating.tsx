import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
    rating: number;
    size?: number;
    className?: string;
}

export default function StarRating({
    rating,
    size = 14,
    className = "",
}: StarRatingProps) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
        <div className={`flex items-center gap-0.5 ${className}`}>
            {Array.from({ length: fullStars }).map((_, i) => (
                <Star
                    key={`full-${i}`}
                    size={size}
                    className="fill-amber-400 text-amber-400"
                />
            ))}
            {hasHalf && (
                <StarHalf
                    size={size}
                    className="fill-amber-400 text-amber-400"
                />
            )}
            {Array.from({ length: emptyStars }).map((_, i) => (
                <Star
                    key={`empty-${i}`}
                    size={size}
                    className="text-stone-300"
                />
            ))}
        </div>
    );
}
