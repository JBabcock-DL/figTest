import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "figTest",
  description: "Design system component playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" data-font-scale="100">
      <body>{children}</body>
    </html>
  );
}
