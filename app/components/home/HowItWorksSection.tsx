export default function HowItWorksSection() {
  const steps = [
    { n: 1, t: "Join the community", d: "Create your account and introduce yourself." },
    { n: 2, t: "Pick a challenge/project", d: "Choose something that excites you." },
    { n: 3, t: "Build together", d: "Form a team and start shipping." },
    { n: 4, t: "Showcase your work", d: "Publish and celebrate wins." },
  ];
  return (
    <section className="px-6 py-20 bg-black/95">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white text-center">How it works</h2>
        <ol className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <li key={s.n} className="relative rounded-2xl p-6 bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-teal-400 text-black font-extrabold">{s.n}</span>
                <h3 className="text-white font-bold">{s.t}</h3>
              </div>
              <p className="mt-3 text-white/80 text-sm">{s.d}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute right-[-14px] top-1/2 -translate-y-1/2 h-0 w-0 border-y-[12px] border-y-transparent border-l-[14px] border-l-white/15" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
