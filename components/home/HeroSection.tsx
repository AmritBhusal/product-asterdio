import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-900">
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.12),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,162,158,0.08),transparent_50%)]" />

            <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
                <div className="max-w-2xl">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
                        <Sparkles className="h-4 w-4" />
                        Premium Collection
                    </div>

                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Discover{" "}
                        <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                            Exceptional
                        </span>{" "}
                        Products
                    </h1>

                    <p className="mt-6 text-lg leading-relaxed text-stone-300 sm:text-xl">
                        Curated selection of premium goods. Explore our collection of
                        handpicked items designed for those who appreciate quality and
                        craftsmanship.
                    </p>

                    <a
                        href="#products"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all duration-200 hover:bg-emerald-500 hover:shadow-emerald-900/40 active:scale-[0.98]"
                    >
                        Explore Collection
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}
