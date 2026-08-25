import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lee Chen Wei (Luis) — Applied AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Social share card in the light dossier style */
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "#FAFAF8",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            letterSpacing: "8px",
            color: "#6B7280",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          Portfolio · Dossier
        </div>

        <div
          style={{
            fontSize: "88px",
            fontWeight: 800,
            color: "#1A1D23",
            letterSpacing: "-3px",
            marginTop: "14px",
            display: "flex",
            gap: "24px",
          }}
        >
          <span>Lee Chen Wei</span>
          <span style={{ color: "#2456F0" }}>(Luis)</span>
        </div>

        <div
          style={{
            fontSize: "32px",
            color: "#374151",
            marginTop: "18px",
            maxWidth: "960px",
            lineHeight: 1.35,
            display: "flex",
          }}
        >
          Applied AI Engineer — I build LLM systems that run in production,
          not in notebooks.
        </div>

        <div
          style={{
            marginTop: "40px",
            paddingTop: "28px",
            borderTop: "1px solid #E5E4E0",
            display: "flex",
            gap: "36px",
            fontSize: "24px",
            fontFamily: "monospace",
            color: "#2456F0",
          }}
        >
          <span>1 yr production AI</span>
          <span style={{ color: "#D1D5DB" }}>·</span>
          <span>11 systems live</span>
          <span style={{ color: "#D1D5DB" }}>·</span>
          <span>RM5k MRR</span>
          <span style={{ color: "#D1D5DB" }}>·</span>
          <span>CGPA 3.80</span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "56px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "22px",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#0E7C66",
            }}
          />
          <span style={{ color: "#0E7C66" }}>
            open to work — 2 weeks&apos; notice
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "56px",
            right: "80px",
            fontSize: "22px",
            color: "#2456F0",
            fontWeight: 700,
          }}
        >
          luis-s-personal-web.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
