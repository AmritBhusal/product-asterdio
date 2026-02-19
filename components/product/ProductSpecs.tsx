import { Product } from "@/types/product";
import { BadgeCheck } from "lucide-react";

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

            {/* Barcode & QR */}
            <div className="mt-8 rounded-xl bg-stone-50 p-4">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-stone-400">Authenticity</span>
                    <BadgeCheck className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="font-mono text-xs text-stone-600 mb-3">{product.meta.barcode}</p>
                <div className="flex justify-center bg-white rounded-lg p-3">
                    <img src={product.meta.qrCode} alt="QR" className="h-20 w-20 object-contain" />
                </div>
            </div>
        </div>
    );
}
