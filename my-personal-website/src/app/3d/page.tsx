"use client";

import dynamic from "next/dynamic";

// Three.js touches window/document — client-only, no SSR.
const Portfolio3D = dynamic(() => import("@/components/Portfolio3D"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-[#05070f] text-white/50 text-sm">
      Loading 3D world…
    </div>
  ),
});

export default function ThreeDPage() {
  return <Portfolio3D />;
}
