import { Product } from "@/types/product";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";

interface ProductSpecsProps {
    product: Product;
}

export default function ProductSpecs({ product }: ProductSpecsProps) {
    return (
        <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-stone-900 mb-5">Specifications</h2>
            <dl className="space-y-3 text-sm">
                {[
                    { dt: "SKU", dd: product.sku },
                    { dt: "Category", dd: product.category },
                    { dt: "Weight", dd: `${product.weight}g` },
                    { dt: "Dimensions", dd: `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm` },
                    { dt: "Min. Order", dd: `${product.minimumOrderQuantity} units` },
                    { dt: "Stock", dd: `${product.stock} available` }
                ].map((row, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-stone-100">
                        <dt className="text-stone-400">{row.dt}</dt>
                        <dd className="font-medium text-stone-900 text-right">{row.dd}</dd>
                    </div>
                ))}
            </dl>

            {product.tags && product.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                    {product.tags.map(tag => (
                        <span key={tag} className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-semibold text-stone-500">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Authenticity Message & CTA */}
            <div className="mt-8 rounded-xl bg-green-200 p-5 border border-stone-100">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-800">Authenticity</span>
                    <BadgeCheck className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="space-y-4">
                    <p className="text-xs text-stone-600 leading-relaxed">
                        Asterdio focuses on shipping the genuine products. You can verify our product authenticity.
                    </p>
                    <Link
                        href="/verification"
                        className="flex items-center justify-center gap-2 w-full rounded-lg bg-white border border-stone-200 py-2.5 text-xs font-bold text-stone-900 shadow-sm transition-all hover:bg-stone-50 hover:border-stone-300"
                    >
                       Learn How To
                    </Link>
                </div>
            </div>
        </div>
    );
}
