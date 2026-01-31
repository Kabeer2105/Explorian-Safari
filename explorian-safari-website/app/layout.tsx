import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { getLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Explorian Safaris | Tanzania Wildlife Safaris & Mountain Trekking",
  description: "Experience authentic African safaris, mountain trekking, and beach holidays in Tanzania. Licensed safari company based in Moshi, Kilimanjaro.",
  keywords: ["Tanzania safari", "Kilimanjaro trekking", "Zanzibar beach", "safari tours", "wildlife safari", "Africa travel"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ margin: 0, padding: 0 }}>
        <NextIntlClientProvider messages={messages}>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
