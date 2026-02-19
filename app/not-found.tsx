import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="mx-auto max-w-md text-center">
                <p className="text-7xl font-bold text-stone-200">404</p>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-stone-900">
                    Page not found
                </h2>
                <p className="mt-2 text-sm text-stone-500">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="mt-8 flex items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-stone-800 active:scale-95"
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Link>
                    <Link
                        href="/#products"
                        className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-all hover:bg-stone-50 active:scale-95"
                    >
                        <Search className="h-4 w-4" />
                        Browse Products
                    </Link>
                </div>
            </div>
        </div>
    );
}
