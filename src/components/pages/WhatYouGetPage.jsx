import React from 'react'

const WhatYouGetPage = () => {
     const items = [
    {
      title: "Short AI Summary",
      subtitle: "Concise 300-word summary for quick grasp",
      note: "(OpenAI-first, fallback to heuristic).",
    },
    {
      title: "Structured Brief",
      subtitle: "Facts, Issues, Holding, Reasoning & Order",
      note: "Presented in clean sections for reading & export.",
    },
    {
      title: "Case Metadata",
      subtitle: "Court, date, parties and judges",
      note: "Normalized for display & export.",
    },
    {
      title: "Citations & Integrity",
      subtitle: "Surface citations and flag anomalies",
      note: "(premium focus).",
    },
    {
      title: "Precedent Finder",
      subtitle: "Locate similar cases using embeddings & FAISS",
      note: "(premium - coming soon).",
    },
    {
      title: "Statutes Detection",
      subtitle: "Regex+LLM pipeline to detect relevant statutes",
      note: "(premium).",
    },
  ];
  return (
    <>
    <main className="min-h-screen bg-black text-white px-6 md:px-20 py-16">
      <header className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#d4af37]">
          What you get
        </h1>
        <p className="mt-4 text-gray-300">
          Clear outputs designed for lawyers and teams. Exportable. Auditable.
        </p>
      </header>

      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((it, idx) => (
          <article
            key={idx}
            className="bg-black/60 border border-gray-700 rounded-lg p-6 backdrop-blur-sm flex flex-col gap-3"
          >
            <div className="flex items-start gap-4">
              <div className="flex-none w-12 h-12 rounded-full bg-[#d4af37]/10 text-[#d4af37] font-semibold flex items-center justify-center text-lg">
                {idx + 1}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#d4af37]">
                  {it.title}
                </h2>
                <p className="text-gray-300 text-sm mt-1">{it.subtitle}</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm mt-2">{it.note}</p>

            {/* optional visual placeholder */}
            <div className="mt-4 h-36 rounded-md border border-gray-700 bg-gradient-to-br from-transparent to-black/30 flex items-center justify-center text-gray-600 text-sm">
              Visual / demo area
            </div>
          </article>
        ))}
      </section>
    </main>
    </>
  )
}

export default WhatYouGetPage