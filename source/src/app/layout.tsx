import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FooterConditional } from "@components/footer-conditional";
import { UserProvider } from "@/context/user-context";
import { CartProvider } from "@/context/cart-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ticket-taka | Sports event tickets",
    template: "%s | Ticket-taka",
  },
  description:
    "Ticket-taka helps you discover upcoming sports events, compare matches, and buy tickets quickly with a clean, mobile-friendly experience.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Ticket-taka | Sports event tickets",
    description:
      "Browse and book tickets for upcoming sports events in and around Split with filters, favorites, and a smooth checkout.",
    url: "https://hci-2025-26.vercel.app/",
    siteName: "Ticket-taka",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-ticket-taka.png",
        width: 1200,
        height: 630,
        alt: "Ticket-taka sports event ticketing homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ticket-taka | Sports event tickets",
    description:
      "Discover and book tickets for live sports events with filters, favorites, and an easy cart experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <CartProvider>
            {children}
            <FooterConditional />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
