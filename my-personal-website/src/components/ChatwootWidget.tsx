"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    chatwootSettings?: Record<string, unknown>;
    chatwootSDK?: { run: (opts: { websiteToken: string; baseUrl: string }) => void };
  }
}

const BASE_URL = "https://chat.sapot.ai";
const WEBSITE_TOKEN = "HWiJMDsKepjqQuJWEY53hMtJ"; // public widget token

export default function ChatwootWidget() {
  useEffect(() => {
    if (document.getElementById("chatwoot-sdk")) return; // once per session

    // Left side — the Ask AI button owns bottom-right
    const compact = window.matchMedia("(max-width: 640px)").matches;
    window.chatwootSettings = {
      position: "left",
      // Icon-only on phones — two expanded pills don't fit side by side
      type: compact ? "standard" : "expanded_bubble",
      launcherTitle: "Message Luis directly",
      darkMode: "auto",
    };

    const script = document.createElement("script");
    script.id = "chatwoot-sdk";
    script.src = `${BASE_URL}/packs/js/sdk.js`;
    script.async = true;
    script.onload = () => {
      window.chatwootSDK?.run({ websiteToken: WEBSITE_TOKEN, baseUrl: BASE_URL });
    };
    document.body.appendChild(script);

    // The SDK renders the launcher in a shadow root and sometimes stamps a
    // stale `top` that lands below the mobile viewport. Page CSS can't cross
    // the shadow boundary, so re-anchor the bubble directly.
    const anchorBubble = () => {
      for (const host of document.body.querySelectorAll("*")) {
        const root = (host as HTMLElement).shadowRoot;
        if (!root) continue;
        root.querySelectorAll<HTMLElement>(".woot-widget-bubble").forEach((el) => {
          el.style.setProperty("top", "auto", "important");
          el.style.setProperty("bottom", "24px", "important");
        });
      }
    };
    const interval = setInterval(anchorBubble, 1000);
    const stop = setTimeout(() => clearInterval(interval), 45000);
    window.addEventListener("resize", anchorBubble);
    return () => {
      clearInterval(interval);
      clearTimeout(stop);
      window.removeEventListener("resize", anchorBubble);
    };
  }, []);

  return null;
}
