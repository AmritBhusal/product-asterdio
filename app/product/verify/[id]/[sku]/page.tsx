import Link from "next/link";
import { getProduct } from "@/services/productService";
import { CheckCircle2, XCircle, ArrowRight, ExternalLink } from "lucide-react";

interface Props {
    params: Promise<{
        id: string;
        sku: string;
    }>;
}

export default async function ProductVerifyPage({ params }: Props) {
    const { id, sku } = await params;

    let product = null;
    let isGenuine = false;
    let error = null;

    try {
        product = await getProduct(id);
        // Compare SKU (case-insensitive for robustness, though usually it should match exactly)
        isGenuine = product.sku.toLowerCase() === sku.toLowerCase();
    } catch (e) {
        error = "Product not found or system error.";
    }

    return (
        <main className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden">
                {/* Header/Result Indicator */}
                <div className={`py-12 flex flex-col items-center text-center px-6 ${isGenuine ? 'bg-primary/5' : 'bg-red-50'}`}>
                    <div className="mb-6 relative">
                        {isGenuine ? (
                            <>
                                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                                <CheckCircle2 className="w-20 h-20 text-primary relative z-10" />
                            </>
                        ) : (
                            <XCircle className="w-20 h-20 text-red-500" />
                        )}
                    </div>

                    <h1 className={`text-3xl font-bold ${isGenuine ? 'text-stone-900' : 'text-stone-900'}`}>
                        {isGenuine ? "Authentication Success" : "Authentication Failed"}
                    </h1>
                    <p className={`mt-2 font-medium ${isGenuine ? 'text-primary' : 'text-red-600 uppercase tracking-widest text-sm'}`}>
                        {isGenuine ? "Genuine Asterdio Product" : "Verification Failed"}
                    </p>
                </div>

                <div className="p-8 space-y-8">
                    {isGenuine && product ? (
                        <>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                                    <span className="text-stone-500 text-sm">Product Name</span>
                                    <span className="text-stone-900 font-semibold">{product.title}</span>
                                </div>
                                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                                    <span className="text-stone-500 text-sm">Product ID</span>
                                    <span className="text-stone-900 font-mono">{product.id}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-stone-500 text-sm">SKU</span>
                                    <span className="text-stone-900 font-mono italic">{product.sku}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-6 pt-4">
                                <img src="/logo.svg" alt="Asterdio" className="h-10 opacity-60" />
                                <p className="text-center text-stone-500 text-sm leading-relaxed">
                                    Thank you for choosing Asterdio. This product has passed our authenticity checks and is confirmed to be a genuine creation from our artisans.
                                </p>

                                <div className="w-full flex flex-col gap-3">
                                    <Link
                                        href={`/product/${id}`}
                                        className="flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white w-full py-4 rounded-2xl font-semibold transition-all shadow-lg shadow-stone-900/20 group"
                                    >
                                        View Product Details
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href="/"
                                        className="flex items-center justify-center text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors"
                                    >
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6 text-center">
                            <p className="text-stone-600 leading-relaxed">
                                {error || "The combination of Product ID and SKU provided does not match our records. This could be due to a typo or the product may not be an authentic Asterdio creation."}
                            </p>

                            <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                                <p className="text-red-700 text-sm font-medium">
                                    Warning: If you believe this is an error, please contact our support team immediately.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 pt-4">
                                <Link
                                    href="/verification"
                                    className="bg-stone-100 hover:bg-stone-200 text-stone-900 w-full py-4 rounded-2xl font-semibold transition-all"
                                >
                                    Retry Verification
                                </Link>
                                <Link
                                    href="/contact"
                                    className="flex items-center justify-center gap-2 text-primary hover:text-primary/80 font-semibold"
                                >
                                    Contact Support
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
