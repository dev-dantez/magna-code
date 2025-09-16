"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  { title: "Civic Service Finder", desc: "Discover local services built by the community.", tags: ["Next.js","Supabase"], grad: "from-cyan-400/30 via-teal-300/30 to-violet-400/30" },
  { title: "Open Health Tracker", desc: "Collaborative health dashboards and insights.", tags: ["React","D3"], grad: "from-violet-400/30 via-fuchsia-300/30 to-sky-400/30" },
  { title: "Green Commute", desc: "Plan eco-friendly routes with peers.", tags: ["Maps","AI"], grad: "from-sky-400/30 via-cyan-300/30 to-teal-400/30" },
  { title: "Skill Match", desc: "Match mentors with builders in minutes.", tags: ["Microservices","Node"], grad: "from-teal-400/30 via-cyan-300/30 to-indigo-400/30" },
  { title: "Crisis Response Hub", desc: "Rapid collaboration for relief efforts.", tags: ["Realtime","Edge"], grad: "from-indigo-400/30 via-violet-300/30 to-teal-400/30" },
  { title: "Edu Sparks", desc: "Community-built learning modules.", tags: ["PWA","Offline"], grad: "from-cyan-400/30 via-sky-300/30 to-violet-400/30" },
];

function Counter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const duration = 1500;
          const start = performance.now();
          const animate = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            setVal(Math.floor(p * target));
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return (
    <div className="text-center">
      <span ref={ref} className="text-4xl sm:text-5xl font-extrabold text-white">{val}+</span>
      <p className="text-white/80 mt-1">{label}</p>
    </div>
  );
}

export default function ShowcaseSection() {
  return (
    <section id="showcase" className="relative px-6 py-20 bg-black/90">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white text-center">Built by the Community</h2>
        <p className="text-white/80 text-center mt-3">Explore projects shipped by Magna-Coders members.</p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article key={p.title} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${p.grad} p-5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-1` }>
              <h3 className="text-xl font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-white/80 text-sm leading-relaxed">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-xs bg-white/10 text-white/90 border border-white/10">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 max-w-md mx-auto">
          <Counter target={500} label="Members" />
          <Counter target={100} label="Projects Shipped" />
        </div>
      </div>
    </section>
  );
}
