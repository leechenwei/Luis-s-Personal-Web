import { NextRequest, NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Public visitor ticker backend.                                     */
/*  POST  — record a visit (city-level only, no IP stored)             */
/*  GET   — last ~20 visits for the on-site ticker                     */
/*  Storage: Upstash Redis via REST (no SDK dep). Without env vars     */
/*  everything no-ops gracefully and the ticker stays silent.          */
/* ------------------------------------------------------------------ */

const KEY = "visits";
const MAX = 50;
const TTL = 60 * 60 * 24; // 24h

async function redis(commands: (string | number)[][]) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("Upstash error", res.status, await res.text());
    return null;
  }
  return (await res.json()) as { result: unknown }[];
}

const BOT_RE =
  /bot|crawl|spider|slurp|preview|fetch|monitor|lighthouse|headless|curl|wget/i;

// Per-IP throttle so one person can't flood the ticker (per-instance is fine)
const seen = new Map<string, number>();

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  if (BOT_RE.test(ua)) return new NextResponse(null, { status: 204 });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const last = seen.get(ip) ?? 0;
  if (now - last < 10 * 60_000) return new NextResponse(null, { status: 204 });
  seen.set(ip, now);

  // Vercel geo headers (URI-encoded); absent in local dev
  const city = decodeURIComponent(
    req.headers.get("x-vercel-ip-city") ?? ""
  );
  const country = req.headers.get("x-vercel-ip-country") ?? "";

  const entry = JSON.stringify({
    city: city || null,
    country: country || null,
    ts: now,
  });

  await redis([
    ["LPUSH", KEY, entry],
    ["LTRIM", KEY, 0, MAX - 1],
    ["EXPIRE", KEY, TTL],
  ]);

  return new NextResponse(null, { status: 204 });
}

export async function GET() {
  const rows = await redis([["LRANGE", KEY, 0, 19]]);
  const list = (rows?.[0]?.result as string[] | undefined) ?? [];
  const visits = list
    .map((s) => {
      try {
        return JSON.parse(s) as {
          city: string | null;
          country: string | null;
          ts: number;
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean);
  return NextResponse.json(
    { visits },
    { headers: { "Cache-Control": "no-store" } }
  );
}
