import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bedrock — Property Detail",
  description: "Bedrock property detail experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-font-scale="100"
      className={`${GeistSans.variable} ${inter.variable} overflow-x-hidden`}
    >
      <body className={`${inter.className} overflow-x-hidden bg-[var(--color-background-bright)]`}>
        {/* Persistent chrome — present on every route */}
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
