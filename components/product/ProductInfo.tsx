import { Product } from "@/types/product";
import { ShoppingCart, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";

interface ProductInfoProps {
    product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const discountedPrice =
        product.price - (product.price * product.discountPercentage) / 100;

    return (
        <div className="flex flex-col gap-6">
            {/* Brand & Status */}
            <div className="flex items-center gap-2.5 flex-wrap">
                {product.brand && (
                    <span className="rounded-full bg-stone-900 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        {product.brand}
                    </span>
                )}
                <span className={`flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider ${product.stock > 0 ? "text-emerald-600" : "text-rose-500"
                    }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${product.stock > 0 ? "bg-emerald-500" : "bg-rose-500"}`} />
                    {product.availabilityStatus}
                </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl lg:text-4xl leading-tight">
                {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-sm">
                <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`h-3.5 w-3.5 ${j < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-stone-200 text-stone-200"}`} />
                    ))}
                </div>
                <span className="font-semibold text-stone-900">{product.rating}</span>
                <span className="text-stone-400">({product.reviews?.length || 0})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-stone-900">
                    ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                    <>
                        <span className="text-lg text-stone-400 line-through">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                            -{Math.round(product.discountPercentage)}%
                        </span>
                    </>
                )}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-stone-500">
                {product.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
                <button className="flex items-center justify-center gap-2 rounded-xl bg-stone-900 py-3.5 text-sm font-bold text-white transition-all hover:bg-stone-800 active:scale-[0.98]">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                </button>
            </div>

            {/* Trust Row */}
            <div className="grid grid-cols-3 gap-3 border-t border-stone-100 pt-6 mt-2">
                {[
                    { icon: Truck, label: product.shippingInformation || "Free Shipping" },
                    { icon: RotateCcw, label: product.returnPolicy || "30-Day Returns" },
                    { icon: ShieldCheck, label: product.warrantyInformation || "Warranty" }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 text-center">
                        <item.icon className="h-4 w-4 text-stone-400" />
                        <span className="text-[10px] font-medium text-stone-500 leading-tight line-clamp-2">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
