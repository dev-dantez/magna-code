import Link from "next/link";

export default function FooterCTA() {
  return (
    <section className="px-6 py-20 bg-black">
      <div className="max-w-4xl mx-auto rounded-3xl p-10 text-center border border-white/10 bg-gradient-to-br from-sky-500/10 via-teal-400/10 to-violet-500/10 backdrop-blur-md">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Stop coding alone. Start building with Magna-Coders today.</h2>
        <Link href="/create-account" className="mt-6 inline-block primary-cta">Join Now Free</Link>
      </div>
    </section>
  );
}
