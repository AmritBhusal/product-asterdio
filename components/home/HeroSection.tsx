import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="flex flex-col justify-center py-12 lg:py-20 px-4 md:px-12 lg:px-40">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white/50 px-4 py-2 text-xs font-medium text-stone-600 backdrop-blur-sm transition-colors hover:border-stone-300">
                <span className="tracking-wide">PREMIUM COLLECTION</span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
                Discover{" "}
                <span className="bg-gradient-to-r from-stone-900 via-stone-700 to-stone-800 bg-clip-text text-transparent">
                    Exceptional
                </span><br />
                <span className="text-amber-600">Craftsmanship</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
                An exclusive selection of premium goods, curated for those who
                appreciate the finer details and timeless quality.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
                <Link
                    href="#products"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-stone-800 active:scale-95 shadow-lg shadow-stone-200"
                >
                    Explore Collection
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}
