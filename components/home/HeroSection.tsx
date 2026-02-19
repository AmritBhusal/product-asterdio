import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden bg-[#FDFCF0] text-stone-900">

            <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/50 px-4 py-2 text-sm font-medium text-stone-600 backdrop-blur-sm transition-colors hover:border-stone-300">
                        <span className="tracking-wide">PREMIUM COLLECTION</span>
                    </div>

                    <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl">
                        Discover{" "}
                        <span className="bg-gradient-to-r from-stone-900 via-stone-700 to-stone-800 bg-clip-text text-transparent">
                            Exceptional
                        </span><br />
                        <span className="text-amber-600">Craftsmanship</span>
                    </h1>

                    <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone-600 sm:text-xl">
                        An exclusive selection of premium goods, curated for those who
                        appreciate the finer details and timeless quality.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link
                            href="#products"
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-stone-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-stone-800 active:scale-95 shadow-lg shadow-stone-200"
                        >
                            Explore Collection
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>                       
                    </div>
                </div>
            </div>
        </section>
    );
}
