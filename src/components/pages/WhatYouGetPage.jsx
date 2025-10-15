import React from 'react'
 const WhatYouGetPage = () => {
 const features = [
    {
      title: "Short AI Summary",
      description:
        "Concise 300-word summary for quick grasp (OpenAI-first, fallback to heuristic).",
    },
    {
      title: "Structured Brief",
      description:
        "Facts, Issues, Holding, Reasoning & Order in clean sections.",
    },
    {
      title: "Case Metadata",
      description:
        "Court, date, parties and judges normalized for display & export.",
    },
    {
      title: "Citations & Integrity",
      description:
        "Surface citations and flag anomalies (premium focus).",
    },
    {
      title: "Precedent Finder",
      description:
        "Locate similar cases using embeddings & FAISS (premium - coming soon).",
    },
    {
      title: "Statutes Detection",
      description:
        "Regex+LLM pipeline to detect relevant statutes (premium).",
    },
  ];
  return (
    <section className="bg-black text-gray-200 py-20 px-6 md:px-20">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-[#d4af37] mb-12">
        What You Get
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-xl p-6 bg-[#0b0b0b] hover:border-[#d4af37] transition"
          >
            <h3 className="text-lg font-semibold text-[#d4af37] mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


export default WhatYouGetPage