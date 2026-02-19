"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/favorites", label: "Favorites" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-stone-200/60 bg-white/80 backdrop-blur-xl">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <img src="/logo.svg" alt="Asterdio" className="h-8 w-auto" />
                </Link>

                {/* Desktop nav */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile menu */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <button
                            aria-label="Open menu"
                            className="rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
                        >
                            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 bg-white pt-12">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg px-4 py-3 text-base font-medium text-stone-700 transition-colors hover:bg-stone-50 hover:text-stone-900"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
