import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";

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
    <html lang="en" data-theme="light" data-font-scale="100" className="overflow-x-hidden">
      <body className="overflow-x-hidden bg-[var(--color-background-bright)]">
        {/* Persistent chrome — present on every route */}
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
