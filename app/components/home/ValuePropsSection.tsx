export default function ValuePropsSection() {
  const items = [
    { t: "Global Collaboration", d: "Work across time zones with builders worldwide.", i: "🌍" },
    { t: "Real-World Challenges", d: "Tackle meaningful problems with real impact.", i: "🧩" },
    { t: "Mentorship & Support", d: "Get guidance from experienced mentors.", i: "🤝" },
    { t: "Portfolio Showcase", d: "Ship work you can proudly show.", i: "🛠️" },
  ];
  return (
    <section className="px-6 py-20 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white text-center">Why Magna-Coders</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.t} className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-white/20 transition-colors shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              <div className="text-3xl select-none">{it.i}</div>
              <h3 className="mt-4 text-lg font-bold text-white">{it.t}</h3>
              <p className="mt-2 text-white/80 text-sm leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
