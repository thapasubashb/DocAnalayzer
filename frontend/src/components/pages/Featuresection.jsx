import {
  ArrowRight,
  FileText,
  Sparkles,
  ShieldCheck,
  Share2,
} from "lucide-react";

const Featuresection = () => {
  const features = [
    {
      id: 1,
      title: "Upload your case (PDF)",
      description:
        "Drag & drop, paste a link, or pick from your files. We extract text from judgments, orders, and pleadings. Scanned pages are handled with OCR fallbacks. Small cases finish in seconds.",
      image: "/upload.jpeg",
      icon: FileText,
    },
    {
      id: 2,
      title: "AI builds your brief",
      description:
        "Structured sections you expect — Facts, Issues, Holding, Reasoning, Order — plus normalized metadata (court, date, parties, judges).",
      image: "/structure.png",
      icon: Sparkles,
    },
    {
      id: 3,
      title: "Premium insights",
      description:
        "Find similar precedents, detect statutes, and get strategic recommendations (pros/cons, remedies) for drafting and argument prep.",
      image: "/court.jpeg",
      icon: ShieldCheck,
    },
    {
      id: 4,
      title: "Export & Share",
      description:
        "Download a polished brief as PDF or DOCX, copy sections to clipboard, or share a secure link with teammates.",
      image: "/exp.png",
      icon: Share2,
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#050816] px-6 py-20 text-white md:px-10 lg:px-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.12),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.24em] uppercase text-[#f5d77a]">
            Workflow
          </p>
          <h2 className="text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
            From upload to insights — in four elegant steps.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group relative overflow-hidden rounded-[1.75rem] border border-slate-700/80 bg-[rgba(15,23,42,0.7)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:shadow-[0_28px_90px_rgba(212,175,55,0.12)]"
              >
                <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-slate-950 shadow-[0_10px_25px_rgba(212,175,55,0.35)]">
                  <span className="text-sm font-bold">{feature.id}</span>
                </div>

                <div className="pt-14">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-3 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-2 text-[#f5d77a]">
                      <Icon size={16} />
                      <span className="text-xs font-medium uppercase tracking-[0.18em]">
                        Step {feature.id}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {feature.description}
                  </p>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/60">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <button className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/60 bg-[#d4af37]/10 px-5 py-2.5 text-sm font-medium text-[#f5d77a] transition-colors hover:bg-[#d4af37]/15">
            Explore the platform
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Featuresection;
