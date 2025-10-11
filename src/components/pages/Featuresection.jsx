import React from 'react'

const Featuresection = () => {
    const features = [
    {
      id: 1,
      title: "Upload your case (PDF)",
      description:
        "Drag & drop, paste a link, or pick from your files. We extract text from judgments, orders, and pleadings. Scanned pages are handled with OCR fallbacks. Small cases finish in seconds.",
      image: "/hourglass.jpg",
    },
    {
      id: 2,
      title: "AI builds your brief",
      description:
        "Structured sections you expect — Facts, Issues, Holding, Reasoning, Order — plus normalized metadata (court, date, parties, judges).",
      image: "/brief-structure.png",
    },
    {
      id: 3,
      title: "Premium insights",
      description:
        "Find similar precedents, detect statutes, and get strategic recommendations (pros/cons, remedies) for drafting and argument prep.",
      image: "/courtroom.jpg",
    },
    {
      id: 4,
      title: "Export & Share",
      description:
        "Download a polished brief as PDF or DOCX, copy sections to clipboard, or share a secure link with teammates. Coming soon: one-click citation appendix and email to client.",
      image: "/export-share.png",
    },
  ];



  return (

  <>
  <section className="bg-black text-white px-8 md:px-20 py-20">
      <h2 className="text-center text-[#d4af37] text-3xl font-bold mb-12">
        From upload to insights — in three elegant steps.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="relative border border-gray-700 rounded-lg p-6 bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all"
          >
         
            <div className="absolute -left-6 top-6 bg-[#d4af37] text-black font-bold w-8 h-8 rounded-full flex items-center justify-center">
              {feature.id}
            </div>

            <h3 className="text-xl font-semibold text-[#d4af37] mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {feature.description}
            </p>

            <img
              src={feature.image}
              alt={feature.title}
              className="rounded-md border border-gray-700 object-cover w-full h-48"
            />
          </div>
        ))}
      </div>
    </section>
  </>
  )
}

export default Featuresection