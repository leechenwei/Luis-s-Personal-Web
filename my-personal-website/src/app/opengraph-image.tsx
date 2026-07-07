import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lee Chen Wei (Luis) — Applied AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "80px",
          background: "linear-gradient(135deg, #05070f 0%, #0b1024 60%, #101a3f 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#3b82f6",
              boxShadow: "0 0 24px #3b82f6",
            }}
          />
          <div
            style={{
              fontSize: "26px",
              letterSpacing: "8px",
              color: "#8fa3d0",
              textTransform: "uppercase",
            }}
          >
            Applied AI Engineer
          </div>
        </div>

        <div
          style={{
            fontSize: "84px",
            fontWeight: 800,
            color: "#f4f6fb",
            lineHeight: 1.05,
            marginBottom: "24px",
          }}
        >
          Lee Chen Wei
        </div>

        <div
          style={{
            fontSize: "34px",
            color: "#9aa4bf",
            marginBottom: "48px",
            maxWidth: "900px",
          }}
        >
          Production LLM systems · Self-Evaluating Agentic RAG · Full-stack
          SaaS for SMEs
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["RAG", "LangGraph", "Next.js", "pgvector", "Supabase"].map(
            (chip) => (
              <div
                key={chip}
                style={{
                  padding: "10px 24px",
                  borderRadius: "999px",
                  border: "2px solid rgba(59,130,246,0.45)",
                  color: "#7ab3ff",
                  fontSize: "24px",
                  background: "rgba(59,130,246,0.10)",
                }}
              >
                {chip}
              </div>
            )
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            fontSize: "24px",
            color: "#55618a",
          }}
        >
          luis-s-personal-web.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
