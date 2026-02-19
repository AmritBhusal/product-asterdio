import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner";

import { WishlistProvider } from "@/context/WishlistContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asterdio — Global Tech Partner for Digital Transformation & Software Innovation",
  description:
    "Bespoke custom software development and staff augmentation solutions tailored to meet your business needs, driving efficiency and innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <WishlistProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="bottom-right" richColors />
        </WishlistProvider>
      </body>
    </html>
  );
}
