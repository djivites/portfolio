import { Cpu, FolderKanban, Sparkles, Trophy } from "lucide-react";

const tiles = [
  { icon: Cpu, label: "AI Systems", value: "Online" },
  { icon: FolderKanban, label: "Projects", value: "Loaded" },
  { icon: Sparkles, label: "Skills", value: "Synced" },
  { icon: Trophy, label: "Achievements", value: "Ready" }
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-cyan-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,.22),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,.18),transparent_28%)]" />
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <p className="font-display text-sm uppercase tracking-[0.5em] text-cyan-300">JIVITES.AI</p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold text-white md:text-7xl">
          Dashboard initialized
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-cyan-100/70">
          Profile, projects, skills, research, and achievements are ready for the next interface layer.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded border border-cyan-300/20 bg-white/[0.04] p-5 shadow-cyan backdrop-blur"
            >
              <Icon className="h-6 w-6 text-cyan-300" />
              <p className="mt-5 text-sm uppercase tracking-[0.25em] text-cyan-100/50">{label}</p>
              <p className="mt-2 font-display text-xl text-white">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
