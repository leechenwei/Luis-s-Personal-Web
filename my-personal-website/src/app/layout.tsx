import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const TITLE = "Lee Chen Wei (Luis) | Applied AI Engineer";
const DESCRIPTION =
  "Applied AI Engineer building production LLM systems — public Self-Evaluating Agentic RAG, multi-channel AI assistant with vector memory, and full-stack SaaS for SMEs. Explore the portfolio in 2D, walk it in 3D, or ask its built-in AI.";

export const metadata: Metadata = {
  metadataBase: new URL("https://luis-s-personal-web.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Applied AI Engineer",
    "RAG",
    "LLM",
    "LangGraph",
    "Agentic AI",
    "Full Stack Developer",
    "Next.js",
    "Supabase",
    "Malaysia",
  ],
  authors: [{ name: "Lee Chen Wei" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Luis — Applied AI Engineer",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
