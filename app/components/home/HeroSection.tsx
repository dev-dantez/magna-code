"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const TYPING_TEXT = "> Build. Collaborate. Ship Real-World Solutions_";

function useTypewriter(text: string, speed = 38) {
  const [display, setDisplay] = useState("");
  const [cursor, setCursor] = useState(true);
  useEffect(() => {
    let i = 0;
    setDisplay("");
    const id = setInterval(() => {
      if (i <= text.length) {
        setDisplay(text.slice(0, i));
        i++;
      } else {
        clearInterval(id);
      }
    }, speed);
    const blink = setInterval(() => setCursor((c) => !c), 600);
    return () => {
      clearInterval(id);
      clearInterval(blink);
      setCursor(true);
    };
  }, [text, speed]);
  return { display, cursor };
}

const names = [
  "Ava Johnson","Liam Patel","Noah Kim","Mia Garcia","Ethan Brown","Sophia Nguyen","Lucas Smith","Isabella Rossi","Amelia Chen","Oliver Davis","Zoe Lopez","Elijah Wilson","Emma Martin","James Clark","Charlotte Lewis","Henry Walker","Luna Young","Jack Hall","Aria Allen","Levi King"
];

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

const commands = [
  "> Connecting to builders network...",
  "> 523 collaborators online",
  "> Challenge detected: AI-powered LMS",
  "> Syncing repositories... done",
];

export default function HeroSection() {
  const { display, cursor } = useTypewriter(TYPING_TEXT, 35);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [cmdIndex, setCmdIndex] = useState(0);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setParallax({ x, y });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCmdIndex((i) => (i + 1) % commands.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const iconTransforms = useMemo(() => [
    { x: -120, y: -40, r: -10, t: "</>" },
    { x: 160, y: -10, r: 8, t: "{ }" },
    { x: -200, y: 80, r: 14, t: "⚡" },
    { x: 220, y: 120, r: -6, t: "🚀" },
  ], []);

  const scrollToShowcase = () => {
    const el = document.getElementById("showcase");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onRippleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--rx", `${x}px`);
    e.currentTarget.style.setProperty("--ry", `${y}px`);
  };

  // HUD orbit positions
  const ring1 = names.slice(0, 6);
  const ring2 = names.slice(6, 12);

  return (
    <section ref={heroRef} className="relative isolate overflow-hidden min-h-[92vh] flex items-center justify-center text-center px-6 py-24 bg-black">
      {/* Neon grid + particle field */}
      <div className="absolute inset-0 -z-20 neon-grid" />
      <div className="absolute inset-0 -z-10 particle-field" />

      {/* Floating code icons with parallax */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        {iconTransforms.map((it, i) => (
          <div
            key={i}
            className="absolute text-white/70 select-none will-change-transform"
            style={{
              transform: `translate3d(${it.x + parallax.x * 30}px, ${it.y + parallax.y * 30}px, 0) rotate(${it.r + parallax.x * 5}deg)`,
              left: "50%",
              top: "50%",
            }}
          >
            <span className="code-float text-4xl md:text-5xl font-mono drop-shadow-[0_0_30px_rgba(56,189,248,0.45)]">{it.t}</span>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        <h1 className="hero-title glitch text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white" data-text={display}>
          <span className="font-mono">{display}</span>
          {cursor && <span className="hero-cursor">|</span>}
        </h1>
        <p className="mt-6 text-lg sm:text-2xl text-white/90 leading-relaxed">
          Join a global community of developers and designers tackling real challenges, together.
        </p>

        {/* Terminal cycling lines */}
        <div className="mt-5 font-mono text-sm sm:text-base text-left max-w-2xl mx-auto text-white/80">
          <div className="terminal-line fade-slide">{commands[cmdIndex]}</div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 sm:gap-6">
          <Link href="/projects" onMouseMove={onRippleMove} className="primary-cta neon-outline ripple-btn">
            Start Building 🚀
          </Link>
          <div className="relative group">
            <Link href="/create-account" className="secondary-cta glass-btn">Join the Community 🤝</Link>
            <div className="tooltip">Free to join.</div>
          </div>
        </div>

        {/* HUD-style orbiting avatars */}
        <div className="mt-14">
          <p className="text-white/80 text-sm mb-4">Trusted by 500+ developers worldwide</p>
          <div className="hud-orbit mx-auto">
            <div className="orbit ring-1">
              {ring1.map((n, i) => {
                const angle = (i / ring1.length) * 360;
                return (
                  <div key={n} className="orbit-item" style={{ transform: `rotate(${angle}deg) translate(var(--r1)) rotate(${-angle}deg)` }}>
                    <div className="avatar-hud">{initials(n)}</div>
                  </div>
                );
              })}
            </div>
            <div className="orbit ring-2">
              {ring2.map((n, i) => {
                const angle = (i / ring2.length) * 360 + 30;
                return (
                  <div key={n} className="orbit-item" style={{ transform: `rotate(${angle}deg) translate(var(--r2)) rotate(${-angle}deg)` }}>
                    <div className="avatar-hud">{initials(n)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button aria-label="Scroll to next section" onClick={scrollToShowcase} className="mt-12 inline-flex flex-col items-center text-white/80 hover:text-white transition-colors">
          <span className="text-xs">Scroll</span>
          <svg className="glow-chevron" width="20" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
