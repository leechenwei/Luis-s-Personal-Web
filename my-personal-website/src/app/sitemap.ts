import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://luis-s-personal-web.vercel.app";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/3d`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
