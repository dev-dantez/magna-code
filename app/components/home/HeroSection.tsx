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
    const id = setInterval(() => setTagIndex((i) => (i + 1) % TAGLINES.length), 2600);
    return () => clearInterval(id);
  }, []);

  const scrollToShowcase = () => {
    const el = document.getElementById("showcase");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={heroRef} className="relative min-h-[92vh] flex items-center justify-center text-center px-6 py-24 bg-black text-white">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
          Build. Collaborate. Ship Real-World Solutions.
        </h1>
        <p className="mt-6 text-base sm:text-xl text-white/80 leading-relaxed">
          Join a global community of developers and designers tackling real challenges, together.
        </p>

        {/* Optional rotating taglines */}
        <div className="mt-3 h-6 sm:h-7 text-sm sm:text-base text-white/60">
          <span key={tagIndex}>{TAGLINES[tagIndex]}</span>
        </div>

        {/* Reference-style centered visual */}
        <figure className="mt-10 mx-auto w-full max-w-[752px]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white">
            <img
              src="https://cdn.dribbble.com/userupload/7480349/file/original-7e2f4bc653aeea5038f03acad8af9658.png?resize=1200x"
              alt="Product hero reference visual"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        </figure>

        <div className="mt-10 flex items-center justify-center gap-4 sm:gap-6">
          <Link href="/projects" className="px-5 py-3 rounded-full font-semibold bg-white text-black hover:bg-gray-100 transition-colors">
            Start Building 🚀
          </Link>
          <Link href="/create-account" className="px-5 py-3 rounded-full font-semibold border border-white/40 text-white hover:bg-white/10 transition-colors">
            Join the Community 🤝
          </Link>
        </div>

        {/* Minimal scroll indicator */}
        <button aria-label="Scroll to next section" onClick={scrollToShowcase} className="mt-12 inline-flex flex-col items-center text-white/60 hover:text-white transition-colors">
          <svg width="18" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="chevron-bounce">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
