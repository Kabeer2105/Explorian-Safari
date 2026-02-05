import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { LanguageProvider } from "@/lib/language-context";

export const metadata: Metadata = {
  title: "Explorian Safaris | Tanzania Wildlife Safaris & Mountain Trekking",
  description: "Explore the Wild, Uncover the Adventure. Experience authentic African safaris, mountain trekking, and beach holidays in Tanzania. Licensed safari company based in Moshi, Kilimanjaro.",
  keywords: ["Tanzania safari", "Kilimanjaro trekking", "Zanzibar beach", "safari tours", "wildlife safari", "Africa travel"],
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ margin: 0, padding: 0 }}>
        <LanguageProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
