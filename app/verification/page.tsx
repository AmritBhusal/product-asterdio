import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ShieldCheck, QrCode, ArrowRight } from "lucide-react";

export default function VerificationPage() {
    return (
        <main className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
                        Product <span className="text-primary italic">Verification</span>
                    </h1>
                    <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                        At Asterdio, authenticity is our priority. Every genuine product comes with a unique ID and SKU to ensure you receive only the best.
                    </p>
                </div>

                {/* Steps Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        {
                            icon: <ShieldCheck className="w-10 h-10 text-primary" />,
                            title: "Find the Code",
                            description: "Locate the unique QR code or ID/SKU on your product packaging or tag."
                        },
                        {
                            icon: <QrCode className="w-10 h-10 text-primary" />,
                            title: "Scan or Visit",
                            description: "Scan the QR code using your smartphone or visit our verification page directly."
                        },
                        {
                            icon: <CheckCircle className="w-10 h-10 text-primary" />,
                            title: "Instant Check",
                            description: "Our system will instantly confirm if your product is a genuine Asterdio creation."
                        }
                    ].map((step, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
                            <div className="p-3 bg-stone-50 rounded-full">{step.icon}</div>
                            <h3 className="text-xl font-semibold text-stone-900">{step.title}</h3>
                            <p className="text-stone-600 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>

                {/* Dummy Product QR Section */}
                <div className="bg-stone-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6 text-center md:text-left">
                            <h2 className="text-3xl font-bold">Try it out!</h2>
                            <p className="text-stone-400 text-lg">
                                We've prepared a dummy product for you to test our verification system. Scan the QR code or click the button below to see the process in action.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                                <div className="bg-primary/20 text-primary border border-primary/30 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest animate-pulse">
                                    Scan and Try
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shrink-0 shadow-2xl shadow-primary/20">
                            <div className="w-48 h-48 bg-stone-100 rounded-lg flex items-center justify-center p-4">
                                <Image
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://product-asterdio.vercel.app/product/verify/10/FRA-GUC-GUC-010"
                                    alt="Verification QR Code"
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-stone-400 text-xs text-center mt-4">
                                Dummy Product ID: 10
                            </p>
                        </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                </div>
            </div>
        </main>
    );
}
