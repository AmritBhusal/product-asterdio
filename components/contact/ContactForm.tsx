"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(3, "Subject must be at least 3 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Form submitted:", data);
        toast.success("Message sent successfully!", {
            description: "We'll get back to you as soon as possible.",
        });
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-stone-700">
                    Full Name
                </Label>
                <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name")}
                    className="h-11 rounded-xl border-stone-200 bg-white shadow-sm transition-shadow focus:shadow-md"
                />
                {errors.name && (
                    <p className="text-xs text-rose-500">{errors.name.message}</p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-stone-700">
                    Email Address
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    className="h-11 rounded-xl border-stone-200 bg-white shadow-sm transition-shadow focus:shadow-md"
                />
                {errors.email && (
                    <p className="text-xs text-rose-500">{errors.email.message}</p>
                )}
            </div>

            {/* Subject */}
            <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium text-stone-700">
                    Subject
                </Label>
                <Input
                    id="subject"
                    placeholder="How can we help?"
                    {...register("subject")}
                    className="h-11 rounded-xl border-stone-200 bg-white shadow-sm transition-shadow focus:shadow-md"
                />
                {errors.subject && (
                    <p className="text-xs text-rose-500">{errors.subject.message}</p>
                )}
            </div>

            {/* Message */}
            <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-stone-700">
                    Message
                </Label>
                <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    {...register("message")}
                    className="rounded-xl border-stone-200 bg-white shadow-sm transition-shadow focus:shadow-md resize-none"
                />
                {errors.message && (
                    <p className="text-xs text-rose-500">{errors.message.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                    <Send className="h-4 w-4" />
                )}
                {isSubmitting ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
}
