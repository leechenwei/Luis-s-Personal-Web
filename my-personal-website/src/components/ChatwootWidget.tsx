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
    window.chatwootSettings = {
      position: "left",
      type: "expanded_bubble",
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
  }, []);

  return null;
}
