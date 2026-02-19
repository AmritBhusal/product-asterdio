"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="mx-auto max-w-md text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
                    <AlertTriangle className="h-8 w-8 text-rose-500" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-stone-900">
                    Something went wrong
                </h2>
                <p className="mt-2 text-sm text-stone-500">
                    An unexpected error occurred. Please try again or return to the homepage.
                </p>
                <div className="mt-8 flex items-center justify-center gap-3">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-all hover:bg-stone-50 active:scale-95"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-stone-800 active:scale-95"
                    >
                        <Home className="h-4 w-4" />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
