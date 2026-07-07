"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import {
  personalInfo,
  projects,
  experiences,
  awards,
} from "@/data/projects";

/* ================================================================== */
/*  Canvas-texture generators — zero image/audio assets in the world  */
/* ================================================================== */

const ACCENTS: Record<string, string> = {
  blue: "#3b82f6",
  purple: "#a78bfa",
  amber: "#f59e0b",
  emerald: "#34d399",
  pink: "#f472b6",
};

interface PanelSpec {
  chip: string;
  title: string;
  subtitle?: string;
  lines: string[];
  accent: string;
  footer?: string;
  url?: string;
  urlLabel?: string;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const out: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      out.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) out.push(line);
  return out;
}

function makePanelTexture(spec: PanelSpec): THREE.CanvasTexture {
  const W = 1024;
  const H = 1280;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#0e1428");
  bg.addColorStop(1, "#070a15");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle scanlines for holo-screen feel
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = "#7aa2ff";
  for (let sy = 0; sy < H; sy += 6) ctx.fillRect(0, sy, W, 2);
  ctx.globalAlpha = 1;

  // Border glow
  ctx.strokeStyle = spec.accent;
  ctx.lineWidth = 6;
  ctx.globalAlpha = 0.9;
  ctx.strokeRect(10, 10, W - 20, H - 20);
  ctx.globalAlpha = 0.22;
  ctx.lineWidth = 20;
  ctx.strokeRect(10, 10, W - 20, H - 20);
  ctx.globalAlpha = 1;
  // Corner accents
  ctx.fillStyle = spec.accent;
  for (const [cx, cy] of [
    [10, 10],
    [W - 46, 10],
    [10, H - 22],
    [W - 46, H - 22],
  ]) {
    ctx.fillRect(cx, cy, 36, 12);
  }

  let y = 128;

  ctx.font = "600 30px ui-sans-serif, system-ui";
  const chipW = ctx.measureText(spec.chip).width + 48;
  ctx.fillStyle = spec.accent + "33";
  ctx.strokeStyle = spec.accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(64, y - 38, chipW, 56, 28);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = spec.accent;
  ctx.fillText(spec.chip, 88, y + 2);
  y += 96;

  ctx.font = "800 64px ui-sans-serif, system-ui";
  ctx.fillStyle = "#f4f6fb";
  for (const l of wrapText(ctx, spec.title, W - 128)) {
    ctx.fillText(l, 64, y);
    y += 74;
  }

  if (spec.subtitle) {
    y += 6;
    ctx.font = "600 38px ui-sans-serif, system-ui";
    ctx.fillStyle = spec.accent;
    for (const l of wrapText(ctx, spec.subtitle, W - 128)) {
      ctx.fillText(l, 64, y);
      y += 50;
    }
  }

  y += 18;
  ctx.strokeStyle = "#2a3350";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(64, y);
  ctx.lineTo(W - 64, y);
  ctx.stroke();
  y += 58;

  ctx.font = "400 34px ui-sans-serif, system-ui";
  for (const raw of spec.lines) {
    if (y > H - 140) break;
    const isBullet = raw.startsWith("• ");
    const text = isBullet ? raw.slice(2) : raw;
    const indent = isBullet ? 100 : 64;
    if (isBullet) {
      ctx.fillStyle = spec.accent;
      ctx.fillText("▸", 64, y);
    }
    ctx.fillStyle = "#9aa4bf";
    for (const l of wrapText(ctx, text, W - indent - 64)) {
      if (y > H - 140) break;
      ctx.fillText(l, indent, y);
      y += 46;
    }
    y += 14;
  }

  if (spec.footer) {
    ctx.font = "700 34px ui-sans-serif, system-ui";
    ctx.fillStyle = spec.accent;
    ctx.fillText(spec.footer, 64, H - 70);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function makeSignTexture(text: string, accent: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 192;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#080b16";
  ctx.fillRect(0, 0, 1024, 192);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 5;
  ctx.strokeRect(6, 6, 1012, 180);
  ctx.font = "800 76px ui-sans-serif, system-ui";
  ctx.fillStyle = accent;
  ctx.shadowColor = accent;
  ctx.shadowBlur = 24;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text.toUpperCase(), 512, 102);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeGlowTexture(color: string): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, color);
  grad.addColorStop(0.4, color + "55");
  grad.addColorStop(1, "transparent");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

/* ================================================================== */
/*  Exhibit content built from site data                              */
/* ================================================================== */

interface Exhibit extends PanelSpec {
  zone?: string;
}

function buildExhibits(): Exhibit[] {
  const ex: Exhibit[] = [];

  ex.push({
    zone: "About",
    chip: "PROFILE",
    title: `${personalInfo.name} (${personalInfo.alias})`,
    subtitle: personalInfo.title,
    lines: [
      personalInfo.bio,
      "",
      `• ${personalInfo.location}`,
      `• ${personalInfo.email}`,
      `• ${personalInfo.phone}`,
    ],
    accent: ACCENTS.blue,
    footer: "E — open GitHub profile",
    url: personalInfo.github,
    urlLabel: "open GitHub profile",
  });

  const edu = personalInfo.education;
  ex.push({
    chip: "EDUCATION",
    title: edu.university,
    subtitle: edu.degree,
    lines: [
      `• CGPA ${edu.cgpa}`,
      `• ${edu.period}`,
      `• ${edu.location}`,
      `• Languages: ${personalInfo.languages.join(", ")}`,
      "",
      "6× Dean's List across the degree.",
    ],
    accent: ACCENTS.purple,
    footer: "E — view transcript",
    url: edu.transcriptUrl,
    urlLabel: "view transcript",
  });

  ex.push(
    ...experiences.map(
      (e, i): Exhibit => ({
        zone: i === 0 ? "Experience" : undefined,
        chip: e.period,
        title: e.company,
        subtitle: `${e.role} · ${e.location}`,
        lines: e.description
          .slice(0, 4)
          .map((d) => `• ${d.length > 220 ? d.slice(0, 217) + "…" : d}`),
        accent: ACCENTS.blue,
      })
    )
  );

  const personal = projects.filter((p) => p.type === "personal");
  const company = projects.filter((p) => p.type === "company");

  ex.push(
    ...personal.map(
      (p, i): Exhibit => ({
        zone: i === 0 ? "Personal Projects" : undefined,
        chip: "PERSONAL · " + p.category.toUpperCase(),
        title: p.title,
        subtitle: p.tagline,
        lines: [
          ...p.highlights.slice(0, 3).map((h) => `• ${h}`),
          "",
          p.tech.slice(0, 5).join(" · "),
        ],
        accent: ACCENTS.emerald,
        footer: p.demo
          ? "E — launch live demo"
          : p.link
            ? "E — open GitHub repo"
            : undefined,
        url: p.demo || p.link,
        urlLabel: p.demo ? "launch live demo" : "open GitHub repo",
      })
    )
  );

  ex.push(
    ...company.map(
      (p, i): Exhibit => ({
        zone: i === 0 ? "Inside Advisory Work" : undefined,
        chip: "COMPANY · " + p.category.toUpperCase(),
        title: p.title,
        subtitle: p.tagline,
        lines: [
          ...p.highlights.slice(0, 3).map((h) => `• ${h}`),
          "",
          p.tech.slice(0, 5).join(" · "),
        ],
        accent: ACCENTS.amber,
      })
    )
  );

  ex.push({
    zone: "Awards",
    chip: "HONORS",
    title: "Awards & Achievements",
    lines: awards.map((a) => `• ${a.title} (${a.year})`),
    accent: ACCENTS.pink,
  });

  return ex;
}

/* ================================================================== */
/*  Synthesized audio — oscillators & noise, no files                  */
/* ================================================================== */

function createAudio() {
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  const ctx = new Ctor();
  const master = ctx.createGain();
  master.gain.value = 0.6;
  master.connect(ctx.destination);

  // Deep space pad: detuned saws through a dark lowpass, breathing via LFO
  const padGain = ctx.createGain();
  padGain.gain.value = 0.045;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 260;
  padGain.connect(lp);
  lp.connect(master);
  for (const f of [55, 55.6, 110.4, 164.8]) {
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = 0.25;
    o.connect(g);
    g.connect(padGain);
    o.start();
  }
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.06;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.02;
  lfo.connect(lfoGain);
  lfoGain.connect(padGain.gain);
  lfo.start();

  // Footstep: filtered noise burst
  const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  const step = () => {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 260 + Math.random() * 120;
    bp.Q.value = 1.2;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.16, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);
    src.connect(bp);
    bp.connect(g);
    g.connect(master);
    src.start();
  };

  // Interact blip: rising sine chirp
  const blip = () => {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(720, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(1560, ctx.currentTime + 0.12);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.12, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
    o.connect(g);
    g.connect(master);
    o.start();
    o.stop(ctx.currentTime + 0.2);
  };

  return { ctx, master, step, blip };
}

/* ================================================================== */
/*  The world                                                          */
/* ================================================================== */

export default function Portfolio3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [locked, setLocked] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [muted, setMuted] = useState(false);
  // Browsers enforce ~1.3s between exiting pointer lock and re-acquiring it;
  // clicking sooner throws SecurityError. Gate the Enter button meanwhile.
  const [cooldown, setCooldown] = useState(false);
  const mutedRef = useRef(false);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    const mount = mountRef.current;
    if (!mount) return;

    /* ---------- renderer / scene / camera ---------- */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#020308");
    scene.fog = new THREE.Fog("#020308", 18, 70);

    const BASE_FOV = 72;
    const camera = new THREE.PerspectiveCamera(
      BASE_FOV,
      window.innerWidth / window.innerHeight,
      0.1,
      400
    );
    camera.rotation.order = "YXZ";
    const EYE = 1.7;
    camera.position.set(0, EYE, 6);

    /* ---------- layout ---------- */
    const exhibits = buildExhibits();
    const STEP = 5.0;
    const HALF_W = 4.5; // platform half width
    const PANEL_X = 4.85; // panels hover right at the rail line
    const startZ = -4;
    const endZ = startZ - exhibits.length * STEP - 10;
    const length = Math.abs(endZ) + 20;
    const midZ = endZ / 2 + 6;

    /* ---------- starfield & nebulas ---------- */
    const starGeo = new THREE.BufferGeometry();
    const starCount = 3200;
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);
    const starPalette = ["#ffffff", "#bcd2ff", "#c9b8ff", "#8fb8ff"];
    for (let i = 0; i < starCount; i++) {
      // Shell of stars surrounding the whole walkway
      const r = 90 + Math.random() * 160;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) + midZ;
      const c = new THREE.Color(
        starPalette[Math.floor(Math.random() * starPalette.length)]
      );
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        size: 0.7,
        vertexColors: true,
        fog: false,
        transparent: true,
        opacity: 0.95,
      })
    );
    scene.add(stars);

    const nebulaSpecs: [string, number, number, number, number][] = [
      ["#4c1d95", -70, 30, midZ - 40, 90],
      ["#1d4ed8", 75, 20, midZ + 20, 80],
      ["#7c3aed", 40, 45, endZ - 30, 100],
      ["#0e7490", -55, 12, startZ + 10, 70],
    ];
    const nebulas: THREE.Sprite[] = [];
    for (const [color, nx, ny, nz, size] of nebulaSpecs) {
      const sp = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: makeGlowTexture(color),
          transparent: true,
          opacity: 0.32,
          depthWrite: false,
          fog: false,
        })
      );
      sp.position.set(nx, ny, nz);
      sp.scale.setScalar(size);
      scene.add(sp);
      nebulas.push(sp);
    }

    // Drifting dust motes along the walkway
    const dustGeo = new THREE.BufferGeometry();
    const dustCount = 500;
    const dpos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dpos[i * 3] = (Math.random() - 0.5) * 16;
      dpos[i * 3 + 1] = Math.random() * 6;
      dpos[i * 3 + 2] = endZ - 5 + Math.random() * (length + 5);
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dpos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: 0x8fb8ff,
        size: 0.035,
        transparent: true,
        opacity: 0.5,
      })
    );
    scene.add(dust);

    /* ---------- the walkway: mirror floor + neon edges ---------- */
    const mirror = new Reflector(new THREE.PlaneGeometry(HALF_W * 2, length), {
      textureWidth: 1024,
      textureHeight: 1024,
      color: 0x9099aa,
      clipBias: 0.003,
    });
    mirror.rotation.x = -Math.PI / 2;
    mirror.position.set(0, 0, midZ);
    scene.add(mirror);

    // Dark tint over the mirror so reflections read as polished obsidian
    const tint = new THREE.Mesh(
      new THREE.PlaneGeometry(HALF_W * 2, length),
      new THREE.MeshBasicMaterial({
        color: 0x05070f,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
      })
    );
    tint.rotation.x = -Math.PI / 2;
    tint.position.set(0, 0.005, midZ);
    scene.add(tint);

    // Platform slab beneath (visible thickness from space)
    const slab = new THREE.Mesh(
      new THREE.BoxGeometry(HALF_W * 2 + 0.8, 0.5, length),
      new THREE.MeshStandardMaterial({
        color: "#0a0f1e",
        roughness: 0.8,
        metalness: 0.4,
      })
    );
    slab.position.set(0, -0.26, midZ);
    scene.add(slab);

    // Neon edge strips + center guide
    const edgeMat = new THREE.MeshBasicMaterial({ color: "#2563eb" });
    for (const s of [-1, 1]) {
      const edge = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.06, length),
        edgeMat
      );
      edge.position.set(s * (HALF_W + 0.34), 0.02, midZ);
      scene.add(edge);
    }
    const guide = new THREE.Mesh(
      new THREE.PlaneGeometry(0.24, length),
      new THREE.MeshBasicMaterial({
        color: "#1d4ed8",
        transparent: true,
        opacity: 0.8,
      })
    );
    guide.rotation.x = -Math.PI / 2;
    guide.position.set(0, 0.01, midZ);
    scene.add(guide);

    // Rails: glowing top bar + posts
    const railMat = new THREE.MeshBasicMaterial({
      color: "#38bdf8",
      transparent: true,
      opacity: 0.65,
    });
    const postMat = new THREE.MeshStandardMaterial({
      color: "#111a30",
      metalness: 0.7,
      roughness: 0.4,
    });
    const postGeo = new THREE.BoxGeometry(0.07, 1.0, 0.07);
    for (const s of [-1, 1]) {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.05, length),
        railMat
      );
      rail.position.set(s * HALF_W, 1.0, midZ);
      scene.add(rail);
      for (let z = 8; z > endZ; z -= 5) {
        const post = new THREE.Mesh(postGeo, postMat);
        post.position.set(s * HALF_W, 0.5, z);
        scene.add(post);
      }
    }

    /* ---------- lighting ---------- */
    scene.add(new THREE.AmbientLight(0x8899cc, 0.45));
    scene.add(new THREE.HemisphereLight(0x3b4a7a, 0x05070f, 0.6));
    const playerLight = new THREE.PointLight(0x6688ff, 10, 12);
    scene.add(playerLight);

    /* ---------- exhibits: floating reactive panels ---------- */
    interface Interactable {
      z: number;
      url: string;
      label: string;
    }
    interface ReactivePanel {
      group: THREE.Group;
      halo: THREE.Sprite;
      baseY: number;
      baseYaw: number;
      z: number;
      phase: number;
    }
    const interactables: Interactable[] = [];
    const reactives: ReactivePanel[] = [];
    const zones: { name: string; z: number }[] = [];
    const holograms: THREE.Mesh[] = [];
    const panelGeo = new THREE.PlaneGeometry(3.2, 4);
    const glowTexCache = new Map<string, THREE.CanvasTexture>();
    const glowTex = (c: string) => {
      if (!glowTexCache.has(c)) glowTexCache.set(c, makeGlowTexture(c));
      return glowTexCache.get(c)!;
    };

    exhibits.forEach((spec, i) => {
      const z = startZ - i * STEP - 4;
      const side = i % 2 === 0 ? 1 : -1;
      const x = side * PANEL_X;

      const group = new THREE.Group();
      group.position.set(x, 2.15, z);
      // Base: face the walkway center, pre-angled ~30° toward the
      // approaching player so panels are readable while walking forward.
      const baseYaw = (-side * Math.PI) / 2 + side * 0.5;
      group.rotation.y = baseYaw;

      const panel = new THREE.Mesh(
        panelGeo,
        new THREE.MeshBasicMaterial({ map: makePanelTexture(spec) })
      );
      group.add(panel);

      // Accent frame bars top/bottom
      const barMat = new THREE.MeshBasicMaterial({ color: spec.accent });
      const barTop = new THREE.Mesh(
        new THREE.BoxGeometry(3.3, 0.06, 0.06),
        barMat
      );
      barTop.position.y = 2.06;
      group.add(barTop);
      const barBot = barTop.clone();
      barBot.position.y = -2.06;
      group.add(barBot);

      // Halo glow sprite behind panel
      const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex(spec.accent),
          transparent: true,
          opacity: 0.16,
          depthWrite: false,
        })
      );
      halo.position.z = -0.3;
      halo.scale.setScalar(6.5);
      group.add(halo);

      scene.add(group);
      reactives.push({
        group,
        halo,
        baseY: 2.15,
        baseYaw,
        z,
        phase: i * 1.37,
      });

      // A soft light at every other exhibit
      if (i % 2 === 0) {
        const pl = new THREE.PointLight(spec.accent, 9, 12);
        pl.position.set(0, 3.2, z);
        scene.add(pl);
      }

      /* Zone gate: neon arch + hanging sign + rotating hologram */
      if (spec.zone) {
        const zGate = z + STEP / 2 + 1;
        zones.push({ name: spec.zone, z: zGate });

        const frameMat = new THREE.MeshBasicMaterial({ color: spec.accent });
        const top = new THREE.Mesh(
          new THREE.BoxGeometry(HALF_W * 2 + 0.6, 0.1, 0.1),
          frameMat
        );
        top.position.set(0, 3.7, zGate);
        scene.add(top);
        for (const s of [-1, 1]) {
          const post = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 3.7, 0.1),
            frameMat
          );
          post.position.set(s * (HALF_W + 0.25), 1.85, zGate);
          scene.add(post);
        }
        const signMat = new THREE.MeshBasicMaterial({
          map: makeSignTexture(spec.zone, spec.accent),
          transparent: true,
          side: THREE.DoubleSide,
        });
        const sign = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 0.86), signMat);
        sign.position.set(0, 3.12, zGate);
        scene.add(sign);

        // Wireframe hologram spinning above the gate
        const holo = new THREE.Mesh(
          new THREE.TorusKnotGeometry(0.55, 0.16, 90, 12),
          new THREE.MeshBasicMaterial({
            color: spec.accent,
            wireframe: true,
            transparent: true,
            opacity: 0.5,
          })
        );
        holo.position.set(0, 5.2, zGate);
        scene.add(holo);
        holograms.push(holo);
      }

      if (spec.url) {
        interactables.push({
          z,
          url: spec.url,
          label: spec.urlLabel || "open link",
        });
      }
    });

    /* ---------- awards sparkles ---------- */
    const awardsZ = startZ - (exhibits.length - 1) * STEP - 4;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkCount = 90;
    const spos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      spos[i * 3] = (Math.random() - 0.5) * 8;
      spos[i * 3 + 1] = 0.5 + Math.random() * 4;
      spos[i * 3 + 2] = awardsZ + (Math.random() - 0.5) * 6;
    }
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(spos, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
    });
    scene.add(new THREE.Points(sparkGeo, sparkMat));

    /* ---------- contact stargate at the end ---------- */
    const doorZ = endZ + 1.2;
    const door = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 3.8),
      new THREE.MeshBasicMaterial({
        map: makePanelTexture({
          chip: "CONTACT",
          title: "Let's Build Something Together",
          subtitle: "Open to Applied AI Engineer roles",
          lines: [
            `• ${personalInfo.email}`,
            `• ${personalInfo.phone} (WhatsApp)`,
            "• github.com/leechenwei",
            "• linkedin.com/in/lcw02",
          ],
          accent: ACCENTS.emerald,
          footer: "E — say hello via WhatsApp",
        }),
      })
    );
    door.position.set(0, 2.1, doorZ);
    scene.add(door);

    const rings: THREE.Mesh[] = [];
    const ringSpecs: [number, string, number][] = [
      [2.5, "#34d399", 0.5],
      [2.95, "#38bdf8", -0.34],
      [3.4, "#a78bfa", 0.21],
    ];
    for (const [radius, color, speed] of ringSpecs) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.05, 12, 80),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.75,
        })
      );
      ring.position.set(0, 2.1, doorZ - 0.4);
      ring.userData.speed = speed;
      scene.add(ring);
      rings.push(ring);
    }
    const doorGlow = new THREE.PointLight(0x34d399, 24, 20);
    doorGlow.position.set(0, 2.4, doorZ + 3);
    scene.add(doorGlow);
    const doorHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex("#34d399"),
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
      })
    );
    doorHalo.position.set(0, 2.1, doorZ - 0.6);
    doorHalo.scale.setScalar(11);
    scene.add(doorHalo);
    interactables.push({
      z: endZ + 2,
      url: personalInfo.whatsapp,
      label: "say hello via WhatsApp",
    });
    zones.push({ name: "Contact", z: endZ + 4 });

    /* ---------- welcome sign ---------- */
    const welcome = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 1.8),
      new THREE.MeshBasicMaterial({
        map: (() => {
          const c = document.createElement("canvas");
          c.width = 1024;
          c.height = 512;
          const g = c.getContext("2d")!;
          g.fillStyle = "#080b16";
          g.fillRect(0, 0, 1024, 512);
          g.strokeStyle = "#3b82f6";
          g.lineWidth = 6;
          g.strokeRect(8, 8, 1008, 496);
          g.textAlign = "center";
          g.fillStyle = "#f4f6fb";
          g.font = "800 84px ui-sans-serif, system-ui";
          g.fillText("WELCOME ABOARD", 512, 150);
          g.fillStyle = "#3b82f6";
          g.font = "600 46px ui-sans-serif, system-ui";
          g.fillText("Luis's Portfolio Station", 512, 250);
          g.fillStyle = "#9aa4bf";
          g.font = "400 40px ui-sans-serif, system-ui";
          g.fillText("Walk the light bridge to explore ↓", 512, 360);
          g.fillStyle = "#c9b8ff";
          g.font = "600 30px ui-sans-serif, system-ui";
          g.fillText("✦ Built with Claude Fable 5 ✦", 512, 448);
          const t = new THREE.CanvasTexture(c);
          t.colorSpace = THREE.SRGBColorSpace;
          return t;
        })(),
        transparent: true,
        side: THREE.DoubleSide,
      })
    );
    // Well before the first zone gate (startZ - 0.5 z-fights the About gate sign)
    welcome.position.set(0, 2.6, 0.5);
    scene.add(welcome);

    /* ---------- audio (lazy init on first pointer lock) ---------- */
    let audio: ReturnType<typeof createAudio> | null = null;

    /* ---------- controls & state ---------- */
    const keys = new Set<string>();
    let yaw = 0;
    let pitch = 0;
    let roll = 0;
    let vy = 0;
    let jumpY = 0;
    const vel = new THREE.Vector3();
    let introT = -1; // >=0 while cinematic fly-in is playing

    const nearInteractable = () => {
      let best: Interactable | undefined;
      let bestD = 2.8;
      for (const it of interactables) {
        const d = Math.abs(camera.position.z - it.z);
        if (d < bestD) {
          bestD = d;
          best = it;
        }
      }
      return best;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      keys.add(e.code);
      if (!document.pointerLockElement || introT >= 0) return;
      if (e.code === "KeyE") {
        const near = nearInteractable();
        if (near) {
          audio?.blip();
          window.open(near.url, "_blank", "noopener");
        }
      }
      if (e.code === "Space" && jumpY <= 0.001) vy = 4.6;
      if (e.code === "KeyM") {
        setMuted((m) => {
          if (audio) audio.master.gain.value = m ? 0.6 : 0;
          return !m;
        });
      }
    };
    const onKeyUp = (e: KeyboardEvent) => keys.delete(e.code);
    const onMouseMove = (e: MouseEvent) => {
      if (!document.pointerLockElement || introT >= 0) return;
      yaw -= e.movementX * 0.0022;
      pitch -= e.movementY * 0.0022;
      pitch = Math.max(-1.35, Math.min(1.35, pitch));
    };
    let cooldownTimer: ReturnType<typeof setTimeout> | undefined;
    const onLockChange = () => {
      const isLocked = document.pointerLockElement === renderer.domElement;
      setLocked(isLocked);
      if (!isLocked) {
        setCooldown(true);
        clearTimeout(cooldownTimer);
        cooldownTimer = setTimeout(() => setCooldown(false), 1400);
      }
      if (isLocked && !audio) {
        audio = createAudio();
        if (mutedRef.current) audio.master.gain.value = 0;
        introT = 0; // start cinematic on first entry
      }
      audio?.ctx.resume();
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("pointerlockchange", onLockChange);
    window.addEventListener("resize", onResize);

    /* ---------- main loop ---------- */
    const clock = new THREE.Clock();
    let bobT = 0;
    let lastStepPhase = 0;
    let t = 0;

    renderer.setAnimationLoop(() => {
      const dt = Math.min(clock.getDelta(), 0.05);
      t += dt;

      /* Cinematic fly-in */
      if (introT >= 0) {
        introT += dt;
        const k = Math.min(introT / 2.4, 1);
        const e = 1 - Math.pow(1 - k, 3); // easeOutCubic
        camera.position.set(
          Math.sin(k * Math.PI) * 6 * (1 - e),
          THREE.MathUtils.lerp(16, EYE, e),
          THREE.MathUtils.lerp(26, 6, e)
        );
        camera.lookAt(0, 2, camera.position.z - 12);
        if (k >= 1) {
          introT = -1;
          yaw = 0;
          pitch = 0;
          camera.rotation.set(0, 0, 0);
        }
      } else {
        /* Movement */
        const fwd =
          (keys.has("KeyW") || keys.has("ArrowUp") ? 1 : 0) -
          (keys.has("KeyS") || keys.has("ArrowDown") ? 1 : 0);
        const strafe =
          (keys.has("KeyD") || keys.has("ArrowRight") ? 1 : 0) -
          (keys.has("KeyA") || keys.has("ArrowLeft") ? 1 : 0);
        const sprint = keys.has("ShiftLeft") || keys.has("ShiftRight");
        const speed = sprint ? 9.5 : 5;

        const dir = new THREE.Vector3(
          Math.sin(yaw) * -fwd + Math.cos(yaw) * strafe,
          0,
          Math.cos(yaw) * -fwd - Math.sin(yaw) * strafe
        );
        if (dir.lengthSq() > 0) dir.normalize();
        vel.lerp(dir.multiplyScalar(speed), 1 - Math.pow(0.0001, dt));

        camera.position.x = THREE.MathUtils.clamp(
          camera.position.x + vel.x * dt,
          -HALF_W + 0.7,
          HALF_W - 0.7
        );
        camera.position.z = THREE.MathUtils.clamp(
          camera.position.z + vel.z * dt,
          endZ + 2.4,
          8
        );

        /* Jump */
        if (jumpY > 0 || vy !== 0) {
          vy -= 11.5 * dt;
          jumpY = Math.max(0, jumpY + vy * dt);
          if (jumpY === 0) vy = 0;
        }

        /* Head bob + synthesized footsteps */
        const moving = vel.length() > 0.5 && jumpY <= 0.001;
        bobT = moving ? bobT + dt * (sprint ? 13 : 9) : 0;
        const stepPhase = Math.floor(bobT / Math.PI);
        if (moving && stepPhase !== lastStepPhase) audio?.step();
        lastStepPhase = stepPhase;
        camera.position.y =
          EYE + jumpY + (moving ? Math.sin(bobT) * 0.045 : 0);

        /* Sprint FOV kick + strafe camera roll */
        const targetFov = sprint && moving ? 80 : BASE_FOV;
        camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 8);
        camera.updateProjectionMatrix();
        const targetRoll = -strafe * 0.022;
        roll += (targetRoll - roll) * Math.min(1, dt * 10);
        camera.rotation.set(pitch, yaw, roll);
      }

      playerLight.position.copy(camera.position).y += 0.4;

      /* Living world */
      stars.rotation.y += dt * 0.004;
      dust.position.y = Math.sin(t * 0.3) * 0.2;
      for (const holo of holograms) {
        holo.rotation.x += dt * 0.6;
        holo.rotation.y += dt * 0.9;
        holo.position.y = 5.2 + Math.sin(t * 1.2 + holo.position.z) * 0.15;
      }
      rings.forEach((r, ri) => {
        r.rotation.z += dt * (r.userData.speed as number);
        (r.material as THREE.MeshBasicMaterial).opacity =
          0.55 + 0.3 * Math.sin(t * 2 + ri * 2.1);
      });
      doorHalo.material.opacity = 0.24 + 0.12 * Math.sin(t * 1.6);
      sparkMat.opacity = 0.5 + 0.4 * Math.sin(t * 3);
      sparkMat.size = 0.05 + 0.025 * (1 + Math.sin(t * 4.3));
      welcome.position.y = 2.6 + Math.sin(t) * 0.08;

      /* Panels hover, react to proximity & turn to face the player */
      for (const rp of reactives) {
        const d = Math.abs(camera.position.z - rp.z);
        const near = THREE.MathUtils.clamp(1 - d / 7, 0, 1);
        rp.group.position.y =
          rp.baseY + Math.sin(t * 0.9 + rp.phase) * 0.06;
        const s = 1 + near * 0.05;
        rp.group.scale.setScalar(s);
        rp.halo.material.opacity = 0.12 + near * 0.4;

        // Billboard tracking: yaw toward the player, clamped near the
        // base angle so panels greet you without spinning behind you.
        if (d < 14) {
          const dx = camera.position.x - rp.group.position.x;
          const dz = camera.position.z - rp.group.position.z;
          let diff = Math.atan2(dx, dz) - rp.baseYaw;
          diff = Math.atan2(Math.sin(diff), Math.cos(diff)); // wrap to [-π, π]
          const target =
            rp.baseYaw + THREE.MathUtils.clamp(diff, -0.85, 0.85);
          rp.group.rotation.y +=
            (target - rp.group.rotation.y) * Math.min(1, dt * 4);
        }
      }

      /* HUD: interaction hint + zone + progress */
      if (hintRef.current) {
        const near = introT < 0 ? nearInteractable() : undefined;
        hintRef.current.textContent = near ? `Press E — ${near.label}` : "";
        hintRef.current.style.opacity = near ? "1" : "0";
      }
      if (zoneRef.current) {
        let current = "The Light Bridge";
        for (const zn of zones) {
          if (camera.position.z < zn.z) current = zn.name;
        }
        if (zoneRef.current.textContent !== current)
          zoneRef.current.textContent = current;
      }
      if (progressRef.current) {
        const p =
          ((6 - camera.position.z) / (6 - (endZ + 2.4))) * 100;
        progressRef.current.style.width = `${Math.max(0, Math.min(100, p))}%`;
      }

      renderer.render(scene, camera);
    });

    /* ---------- cleanup ---------- */
    return () => {
      renderer.setAnimationLoop(null);
      clearTimeout(cooldownTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerlockchange", onLockChange);
      window.removeEventListener("resize", onResize);
      audio?.ctx.close();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];
          mats.forEach((m) => {
            if ("map" in m && m.map) (m.map as THREE.Texture).dispose();
            m.dispose();
          });
        }
        if (obj instanceof THREE.Sprite) {
          obj.material.map?.dispose();
          obj.material.dispose();
        }
      });
      mirror.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enter = () => {
    const canvas = mountRef.current?.querySelector("canvas");
    if (!canvas) return;
    const briefCooldown = () => {
      setCooldown(true);
      setTimeout(() => setCooldown(false), 1400);
    };
    try {
      // Returns a Promise in modern Chrome — swallow cooldown rejections.
      const p = canvas.requestPointerLock() as unknown;
      (p as Promise<void>)?.catch?.(briefCooldown);
    } catch {
      briefCooldown();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#020308]">
      <div ref={mountRef} className="absolute inset-0" />

      {/* Crosshair */}
      {locked && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/70" />
      )}

      {/* Zone title + progress */}
      {locked && (
        <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div
            ref={zoneRef}
            className="text-sm font-semibold tracking-[0.3em] uppercase text-white/70"
          />
          <div className="w-56 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-[width] duration-200"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      )}

      {/* Interaction hint */}
      <div
        ref={hintRef}
        className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-black/60 border border-emerald-400/40 text-emerald-300 text-sm font-medium transition-opacity duration-200 opacity-0"
      />

      {/* Controls bar */}
      {locked && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 text-[11px] text-white/40 font-medium">
          <span>WASD — move</span>
          <span>Mouse — look</span>
          <span>Shift — sprint</span>
          <span>Space — jump</span>
          <span>E — interact</span>
          <span>M — {muted ? "unmute" : "mute"}</span>
          <span>Esc — pause</span>
        </div>
      )}

      {/* Back to 2D */}
      <Link
        href="/"
        className="absolute top-5 left-5 z-20 px-4 py-2 rounded-lg bg-black/60 border border-white/10 text-white/70 text-sm hover:text-white hover:border-white/30 transition-colors"
      >
        ← Back to 2D
      </Link>

      {/* Start / pause overlay */}
      {!locked && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <p className="text-xs tracking-[0.4em] uppercase text-blue-400/80 mb-4">
            Portfolio Station
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 text-center">
            Walk the <span className="text-blue-400">Light Bridge</span>
          </h1>
          <p className="text-white/50 mb-8 text-sm md:text-base text-center max-w-md px-6">
            A first-person journey through my work — floating in open space,
            door by door.
          </p>
          {isTouch ? (
            <p className="max-w-xs text-center text-white/70 text-sm px-6 py-4 rounded-xl border border-white/15 bg-white/5">
              This experience needs a keyboard &amp; mouse — please visit on a
              desktop browser.
            </p>
          ) : (
            <>
              <button
                onClick={enter}
                disabled={cooldown}
                className="px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:bg-blue-500/30 disabled:cursor-wait text-white font-semibold text-lg transition-colors cursor-pointer shadow-[0_0_40px_rgba(59,130,246,0.55)]"
              >
                {cooldown ? "◌ one moment…" : "▶ Click to Enter"}
              </button>
              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/40 max-w-md">
                <span>WASD — move</span>
                <span>Mouse — look</span>
                <span>Shift — sprint</span>
                <span>Space — jump</span>
                <span>E — interact</span>
                <span>M — mute</span>
              </div>
              <p className="mt-4 text-[11px] text-white/25">
                🔊 headphones recommended — the ambience is synthesized live
              </p>
              <p className="mt-6 text-xs font-medium text-violet-300/70">
                ✦ Built with{" "}
                <span className="text-violet-300">Claude Fable 5</span> · Three.js
                · zero assets ✦
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
