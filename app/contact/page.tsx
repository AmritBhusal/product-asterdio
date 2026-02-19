import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
    title: "Contact — Asterdio",
    description:
        "Get in touch with the Asterdio team. Global Tech Partner for Digital Transformation & Software Innovation.",
};

export default function ContactPage() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                    Contact Us
                </h1>
                <p className="mt-3 text-base text-stone-500 sm:text-lg">
                    We&apos;re here to help and answer any questions you might have
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                {/* Form card */}
                <div className="rounded-2xl border border-stone-200/60 bg-stone-50/50 p-6 shadow-sm sm:p-8">
                    <h2 className="mb-6 text-xl font-semibold text-stone-900">
                        Send a Message
                    </h2>
                    <ContactForm />
                </div>

                {/* Info */}
                <div className="lg:pt-4">
                    <ContactInfo />
                </div>
            </div>
        </section>
    );
}
