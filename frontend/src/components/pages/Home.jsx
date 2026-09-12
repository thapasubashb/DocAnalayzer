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
    <section className="relative isolate overflow-hidden bg-[#07090d] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.15),transparent_25%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,9,13,0.92),rgba(0,0,0,0.78))]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:py-32">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-3 py-1 text-xs font-medium tracking-[0.2em] text-[#f5d77a] uppercase shadow-[0_0_25px_rgba(212,175,55,0.2)]">
            <Sparkles size={14} />
            Law & AI • India First
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl">
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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-3 text-base font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#e2bf4f]"
            >
              Upload a Case
              <ArrowRight size={18} />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-white/5 px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:border-[#d4af37]/60 hover:text-[#f5d77a]"
            >
              See how it works
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-300">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-2 backdrop-blur-sm"
              >
                <span className="font-semibold text-white">{item.value}</span>{" "}
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -left-6 top-16 hidden rounded-2xl border border-[#d4af37]/40 bg-[#efc95f]/10 p-3 text-[#f5d77a] shadow-[0_0_30px_rgba(212,175,55,0.18)] md:block">
            <Scale size={26} />
          </div>

          <div className="absolute -right-4 bottom-12 hidden rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-3 text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.2)] md:block">
            <ShieldCheck size={26} />
          </div>

          <div className="rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-5 shadow-[0_35px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm">
            <div className="rounded-[1.5rem] border border-slate-700 bg-slate-900/90 p-5">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Case brief
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    State v. Sharma
                  </h2>
                </div>
                <div className="rounded-full bg-emerald-500/15 p-2 text-emerald-300">
                  <BadgeCheck size={18} />
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {outputHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-3 text-sm text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10 p-4">
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
