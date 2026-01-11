import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: "Explorian Safaris | Tanzania Wildlife Safaris & Mountain Trekking",
  description: "Experience authentic African safaris, mountain trekking, and beach holidays in Tanzania. Licensed safari company based in Moshi, Kilimanjaro.",
  keywords: ["Tanzania safari", "Kilimanjaro trekking", "Zanzibar beach", "safari tours", "wildlife safari", "Africa travel"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
