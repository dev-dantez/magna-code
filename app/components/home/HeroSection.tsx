"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const TAGLINES = [
  "Collaborate Globally.",
  "Solve Real Problems.",
  "Showcase Your Work.",
];

export default function HeroSection() {
  const [tagIndex, setTagIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => setTagIndex((i) => (i + 1) % TAGLINES.length), 2800);
    return () => clearInterval(id);
  }, []);

  const scrollToShowcase = () => {
    const el = document.getElementById("showcase");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={heroRef} className="relative min-h-[92vh] flex items-center px-6 py-20 bg-black text-white">
      <div className="max-w-6xl w-full mx-auto grid items-center gap-12 md:grid-cols-2">
        {/* Left: Copy */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            <span>Open‑source community</span>
          </div>
          <h1 className="mt-5 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            Build. Collaborate. Ship Real-World Solutions.
          </h1>
          <p className="mt-6 text-base sm:text-xl text-white/80 leading-relaxed max-w-2xl md:max-w-none md:pr-6">
            Join a global community of developers and designers tackling real challenges, together.
          </p>
          <div className="mt-3 h-6 sm:h-7 text-sm sm:text-base text-white/60">
            <span key={tagIndex}>{TAGLINES[tagIndex]}</span>
          </div>
          <div className="mt-10 flex items-center justify-center md:justify-start gap-4 sm:gap-6">
            <Link href="/projects" className="px-5 py-3 rounded-full font-semibold bg-white text-black hover:bg-gray-100 transition-colors">
              Start Building 🚀
            </Link>
            <Link href="/create-account" className="px-5 py-3 rounded-full font-semibold border border-white/35 text-white hover:bg-white/10 transition-colors">
              Join the Community 🤝
            </Link>
          </div>
        </div>

        {/* Right: Minimal UI mock (shapes) */}
        <div className="relative h-[22rem] sm:h-[26rem] md:h-[30rem]">
          {/* Back card */}
          <div className="absolute -top-4 right-2 w-[78%] h-[55%] rounded-3xl bg-white/5 border border-white/10" />

          {/* Main card */}
          <div className="absolute inset-x-0 bottom-0 md:inset-y-0 md:right-0 md:left-auto md:w-[88%] h-[75%] md:h-full rounded-3xl bg-white text-black shadow-2xl border border-black/10 overflow-hidden">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-black/10 bg-gray-50">
              <span className="h-3 w-3 rounded-full bg-gray-300" />
              <span className="h-3 w-3 rounded-full bg-gray-300" />
              <span className="h-3 w-3 rounded-full bg-gray-300" />
            </div>
            <div className="p-6 sm:p-8">
              {/* Title block */}
              <div className="h-8 w-2/3 rounded-xl bg-gray-200" />
              {/* Lines */}
              <div className="mt-4 space-y-3">
                <div className="h-3 w-5/6 rounded bg-gray-200" />
                <div className="h-3 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-2/3 rounded bg-gray-200" />
              </div>
              {/* Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/70">Next.js</span>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/70">Supabase</span>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/70">Open Source</span>
              </div>
              {/* Action row */}
              <div className="mt-8 flex items-center gap-3">
                <button className="px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-black/90">Preview</button>
                <button className="px-4 py-2 rounded-lg border border-black/15 text-sm text-black hover:bg-black/5">Details</button>
              </div>
            </div>
          </div>

          {/* Floating small card */}
          <div className="absolute left-0 top-8 w-[46%] rounded-2xl bg-white text-black shadow-xl border border-black/10 overflow-hidden">
            <div className="p-4">
              <div className="h-6 w-2/3 rounded bg-gray-200" />
              <div className="mt-3 h-3 w-5/6 rounded bg-gray-200" />
            </div>
            <div className="px-4 pb-4 flex gap-2">
              <span className="h-6 w-16 rounded-full bg-gray-200" />
              <span className="h-6 w-12 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2">
        <button aria-label="Scroll to next section" onClick={scrollToShowcase} className="inline-flex flex-col items-center text-white/60 hover:text-white transition-colors">
          <svg width="18" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="chevron-bounce">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
