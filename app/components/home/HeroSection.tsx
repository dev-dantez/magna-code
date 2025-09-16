"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const TYPING_TEXT = "Build. Collaborate. Ship Real-World Solutions_";

function useTypewriter(text: string, speed = 50) {
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

export default function HeroSection() {
  const { display, cursor } = useTypewriter(TYPING_TEXT, 35);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

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

  return (
    <section ref={heroRef} className="relative isolate overflow-hidden min-h-[92vh] flex items-center justify-center text-center px-6 py-24 bg-black">
      {/* Animated gradient backdrop */}
      <div className="absolute inset-0 -z-10 animated-gradient" />

      {/* Floating code icons with subtle parallax */}
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
            <span className="code-float text-4xl md:text-5xl font-mono drop-shadow-[0_0_20px_rgba(59,130,246,0.35)]">{it.t}</span>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
          <span className="font-mono">{display}</span>
          {cursor && <span className="hero-cursor">|</span>}
        </h1>
        <p className="mt-6 text-lg sm:text-2xl text-white/90 leading-relaxed">
          Join a global community of developers and designers tackling real challenges, together.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4 sm:gap-6">
          <Link href="/projects" className="primary-cta">
            Start Building 🚀
          </Link>
          <div className="relative group">
            <Link href="/create-account" className="secondary-cta">Join the Community 🤝</Link>
            <div className="tooltip">Free to join.</div>
          </div>
        </div>

        {/* Avatars marquee */}
        <div className="mt-14">
          <p className="text-white/80 text-sm mb-4">Trusted by 500+ developers worldwide</p>
          <div className="mask-gradient rounded-full">
            <div className="marquee flex gap-4 py-2">
              {[...Array(2)].map((_, row) => (
                <div key={row} className="flex gap-3">
                  {names.map((n, i) => (
                    <div key={`${row}-${i}`} className="avatar-badge">
                      <span>{initials(n)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button aria-label="Scroll to next section" onClick={scrollToShowcase} className="mt-12 inline-flex flex-col items-center text-white/80 hover:text-white transition-colors">
          <span className="text-xs">Scroll</span>
          <span className="chevron-bounce">⌄</span>
        </button>
      </div>
    </section>
  );
}
