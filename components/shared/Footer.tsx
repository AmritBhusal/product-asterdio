import Link from "next/link";
import { ShoppingBag, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-stone-200/60 bg-stone-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2"
                        >
                            <img src="/logo.svg" alt="Asterdio" className="h-8 w-auto" />
                        </Link>
                        <p className="text-sm leading-relaxed text-stone-500">
                            Global Tech Partner for Digital Transformation & Software Innovation.
                            Bespoke custom software development and staff augmentation solutions
                            tailored to meet your business needs.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/favorites", label: "Favorites" },
                                { href: "/contact", label: "Contact" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-stone-500 transition-colors hover:text-stone-900"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                            Contact
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-stone-500">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                <span>Aster Suites UN Park Lane, Sankhamul Lalitpur-11, Bagmati</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-stone-500">
                                <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                                <span>+977-9801 038 837</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-stone-500">
                                <Mail className="h-4 w-4 shrink-0 text-emerald-600" />
                                <span>hello@asterdio.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                            Business Hours
                        </h3>
                        <ul className="space-y-2 text-sm text-stone-500">
                            <li>Mon – Fri: 9am – 6pm</li>
                            <li>Saturday: 10am – 4pm</li>
                            <li>Sunday: Closed</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-stone-200 pt-8 text-center text-sm text-stone-400">
                    © {new Date().getFullYear()} Asterdio Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
