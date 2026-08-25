import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
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
    <html lang="en">
      <head>
        <meta name="theme-color" content="#FAFAF8" />
      </head>
      <body className={`${inter.variable} ${grotesk.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
