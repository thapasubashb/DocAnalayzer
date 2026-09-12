import React from "react";
import "./WhatYouGetPage.css";

const features = [
  {
    title: "Short AI Summary",
    description:
      "Concise 300-word summary for quick grasp (OpenAI-first, fallback to heuristic).",
  },
  {
    title: "Structured Brief",
    description: "Facts, Issues, Holding, Reasoning & Order in clean sections.",
  },
  {
    title: "Case Metadata",
    description:
      "Court, date, parties and judges normalized for display & export.",
  },
  {
    title: "Citations & Integrity",
    description: "Surface citations and flag anomalies (premium focus).",
  },
  {
    title: "Precedent Finder",
    description:
      "Locate similar cases using embeddings & FAISS (premium - coming soon).",
  },
  {
    title: "Statutes Detection",
    description: "Regex+LLM pipeline to detect relevant statutes (premium).",
  },
];

const WhatYouGetPage = () => {
  return (
    <section className="relative overflow-hidden bg-[#050816] px-6 py-20 text-gray-200 md:px-10 lg:px-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08),transparent_30%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#f5d77a]">
            Benefits
          </p>
          <h2 className="text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
            What You Get
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card rounded-[1.5rem] border border-slate-700/80 bg-[rgba(15,23,42,0.7)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-lg transition-all duration-300 hover:border-[#d4af37]/60 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#d4af37]/10 text-lg text-[#f5d77a] ring-1 ring-[#d4af37]/20">
                {index + 1}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[#f5d77a]">
                {feature.title}
              </h3>
              <p className="text-sm leading-7 text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetPage;
