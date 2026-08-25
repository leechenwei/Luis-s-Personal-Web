import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

/* JSON-LD Person entity: tells search engines this site, the GitHub and the
   LinkedIn are the same Lee Chen Wei — improves name-search results. */
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lee Chen Wei",
  alternateName: "Luis",
  jobTitle: "Applied AI Engineer",
  url: "https://luis-s-personal-web.vercel.app",
  email: "mailto:LuisLCW02@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Selangor",
    addressCountry: "MY",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Malaya",
  },
  worksFor: {
    "@type": "Organization",
    name: "Inside Advisory Sdn Bhd",
  },
  knowsAbout: [
    "Retrieval-Augmented Generation",
    "Large Language Models",
    "LangGraph",
    "Next.js",
    "Supabase",
  ],
  sameAs: [
    "https://github.com/leechenwei",
    "https://www.linkedin.com/in/luislcw02/",
  ],
};

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
  verification: {
    google: "JPSoQMt5fLUHsviBVZ5p1_ETlXFcamo7quNIuW2dz0M",
  },
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
        {/* No-flash theme init: apply stored preference before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.theme;if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${grotesk.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
