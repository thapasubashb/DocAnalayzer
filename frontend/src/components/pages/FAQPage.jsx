import React, { useState } from "react";

const faqs = [
  {
    question: "What types of PDFs does Swastik AI support?",
    answer:
      "Swastik AI supports judgments, case briefs, legal notices, and academic PDFs. Text-based and searchable PDFs work best. Scanned or image-based files are processed using OCR for recognition.",
  },
  {
    question: "What’s the difference between Basic and Premium?",
    answer:
      "Basic users get AI summaries and structured briefs. Premium adds citation tracing, statute detection, and precedent matching using advanced embeddings. Premium also includes faster response times and export options.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Uploaded documents are processed temporarily and never stored permanently. All traffic is encrypted with HTTPS and follows strict confidentiality protocols suitable for legal material.",
  },
  {
    question: "Can I export the brief?",
    answer:
      "Yes. Users can export AI summaries and structured briefs in PDF and DOCX formats. Premium users can also export citation maps and statute lists.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main className="bg-[#050816] px-6 py-20 text-white md:px-10 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#f5d77a]">
            FAQ
          </p>
          <h1 className="text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base text-slate-300">
            Everything you need to know about Swastik AI.
          </p>
        </header>

        <section className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-[1.25rem] border border-slate-700/80 bg-[rgba(15,23,42,0.7)] shadow-[0_18px_45px_rgba(0,0,0,0.25)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none"
              >
                <span className="font-medium text-[#f5d77a]">
                  {faq.question}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-xl text-[#f5d77a]">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>

              {openIndex === idx && (
                <div className="border-t border-slate-700/80 px-5 py-4">
                  <p className="text-sm leading-7 text-slate-300">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default FAQPage;
