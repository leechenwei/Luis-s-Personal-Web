import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lee Chen Wei (Luis) | AI Engineer & Full Stack Developer",
  description:
    "Portfolio of Lee Chen Wei (Luis) — AI Engineer & Full Stack Developer specializing in AI automation, full-stack systems, and enterprise solutions. Built 14+ production systems with Claude AI, Next.js, Supabase, and more.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Next.js",
    "Claude AI",
    "Supabase",
    "Machine Learning",
    "Malaysia",
  ],
  authors: [{ name: "Lee Chen Wei" }],
  openGraph: {
    title: "Lee Chen Wei (Luis) | AI Engineer & Full Stack Developer",
    description:
      "AI Engineer & Full Stack Developer — 14+ production systems built with AI, Next.js, and Supabase.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lee Chen Wei (Luis) | AI Engineer & Full Stack Developer",
    description:
      "AI Engineer & Full Stack Developer — 14+ production systems built with AI, Next.js, and Supabase.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0A0A0F" />
      </head>
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
