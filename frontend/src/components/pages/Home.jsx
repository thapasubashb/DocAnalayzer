import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const metrics = [
  { label: "Judgments scanned", value: "12k+" },
  { label: "Pleadings structured", value: "4.8x" },
  { label: "Draft turnaround", value: "< 60s" },
];

const outputHighlights = [
  "Facts & chronology",
  "Issues & arguments",
  "Holding & reasoning",
  "Orders & next steps",
];

const Home = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.28),transparent_22%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.22),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.16),transparent_22%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,8,22,0.92),rgba(5,8,22,0.8),rgba(10,14,23,0.95))]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:54px_54px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:py-32">
        <div className="relative z-10 max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/25 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.45)] backdrop-blur-lg md:p-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-3 py-1 text-[10px] font-medium tracking-[0.22em] text-[#f5d77a] uppercase shadow-[0_0_30px_rgba(212,175,55,0.25)] backdrop-blur-sm">
            <Sparkles size={14} />
            Law & AI • India First
          </span>

          <h1 className="mt-6 text-4xl font-black leading-none tracking-[-0.05em] text-white md:text-6xl">
            Where <span className="text-[#d4af37]">Law</span> meets AI.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-8 text-slate-300 md:text-lg">
            Upload judgments and pleadings to generate structured legal briefs
            in seconds — from facts and issues to holding, reasoning, and
            orders.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/file"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-3 text-base font-semibold text-slate-950 shadow-[0_16px_32px_rgba(212,175,55,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e2bf4f]"
            >
              Upload a Case
              <ArrowRight size={18} />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-white/5 px-6 py-3 text-base font-medium text-white backdrop-blur-sm transition-all duration-200 hover:border-[#d4af37]/60 hover:bg-[#d4af37]/5 hover:text-[#f5d77a]"
            >
              See how it works
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-200">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md"
              >
                <span className="font-semibold text-white">{item.value}</span>{" "}
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-20 mx-auto w-full max-w-xl">
          <div className="absolute -left-5 top-14 hidden rounded-2xl border border-[#d4af37]/40 bg-[#d4af37]/10 p-3 text-[#f5d77a] shadow-[0_0_30px_rgba(212,175,55,0.18)] md:block">
            <Scale size={26} />
          </div>

          <div className="absolute -right-4 bottom-12 hidden rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-3 text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.2)] md:block">
            <ShieldCheck size={26} />
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#0b1220]/95 p-5 shadow-[0_35px_100px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
            <div className="rounded-[1.5rem] border border-slate-700/80 bg-[#0f172a] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    Case brief
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    State v. Sharma
                  </h2>
                </div>
                <div className="rounded-full bg-emerald-500/15 p-2 text-emerald-300 ring-1 ring-emerald-400/30">
                  <BadgeCheck size={18} />
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {outputHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-600 bg-slate-900/90 px-3 py-3 text-sm text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="flex items-center justify-between text-sm text-[#f5d77a]">
                  <span className="font-medium">AI summary</span>
                  <span>82% relevance</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  The court held that the appellant’s prior conduct, evidentiary
                  consistency, and statutory interpretation together established
                  a substantial likelihood of prejudice to the respondent’s
                  rights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
