const testimonials = [
  { name: "Priya S.", role: "Frontend Engineer", quote: "I shipped my first PWA here with an amazing global team." },
  { name: "Marco R.", role: "UX Designer", quote: "Mentors gave feedback that leveled up my portfolio fast." },
  { name: "Fatima A.", role: "Full‑Stack Dev", quote: "Magna-Coders turned side ideas into shipped products." },
];

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("");
  return (
    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-fuchsia-400 to-sky-400 text-black font-bold grid place-items-center">
      {initials}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="px-6 py-20 bg-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white text-center">What members say</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl p-6 bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <Avatar name={t.name} />
                <div>
                  <figcaption className="text-white font-semibold">{t.name}</figcaption>
                  <p className="text-white/70 text-xs">{t.role}</p>
                </div>
              </div>
              <blockquote className="mt-4 text-white/90 text-sm leading-relaxed">“{t.quote}”</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
