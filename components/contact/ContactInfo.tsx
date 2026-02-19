import { Mail, MapPin, Phone, Clock } from "lucide-react";

const contactInfo = [
    {
        icon: MapPin,
        label: "Visit Us (NP)",
        value: "Nº 29/24 Aster Suites UN Park Lane, Sankhamul Lalitpur-11, Bagmati",
    },
    {
        icon: MapPin,
        label: "Visit Us (US)",
        value: "2020 N Academy Blvd, Ste 261, Colorado Springs, CO 80909, US",
    },
    {
        icon: Phone,
        label: "Call Us",
        value: "+977-9801 038 837\n+1 (719) 330-3007",
    },
    {
        icon: Mail,
        label: "Email Us",
        value: "hello@asterdio.com",
    },
];

export default function ContactInfo() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-stone-900">Get in Touch</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-500">
                    Have a question or need assistance? We&apos;d love to hear from you.
                    Reach out through any of the channels below.
                </p>
            </div>

            <div className="space-y-5">
                {contactInfo.map((item) => (
                    <div
                        key={item.label}
                        className="flex gap-4 rounded-xl border border-stone-200/60 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-stone-800">
                                {item.label}
                            </p>
                            <p className="mt-0.5 whitespace-pre-line text-sm text-stone-500">
                                {item.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
