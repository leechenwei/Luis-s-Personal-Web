"use client";

import { Play } from "lucide-react";

export default function VideoPlaceholder({
  videoUrl,
}: {
  videoUrl?: string;
}) {
  if (videoUrl) {
    return (
      <div className="aspect-video rounded-xl overflow-hidden bg-dark-surface">
        <video
          src={videoUrl}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay
        />
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-xl bg-dark-surface/80 border border-white/[0.04] flex flex-col items-center justify-center gap-3 group-hover:border-electric-blue/10 transition-colors duration-500">
      <div className="w-12 h-12 rounded-full bg-white/[0.04] flex items-center justify-center border border-white/[0.06]">
        <Play className="w-5 h-5 text-muted-foreground/40 ml-0.5" />
      </div>
      <span className="text-xs text-muted-foreground/30">Demo coming soon</span>
    </div>
  );
}
