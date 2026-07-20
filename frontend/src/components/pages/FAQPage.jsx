import React, { useState } from "react";

const FAQPage = () => {
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

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <main className="min-h-screen bg-black text-white px-6 md:px-20 py-16">
        <header className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#d4af37]">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-gray-300">
            Everything you need to know about Swastik AI.
          </p>
        </header>

        <section className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-700 rounded-lg bg-black/60 p-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left flex justify-between items-center focus:outline-none"
              >
                <span className="font-medium text-[#d4af37]">
                  {faq.question}
                </span>
                <span className="text-[#d4af37] text-xl">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>

              {openIndex === idx && (
                <p className="mt-3 text-gray-300 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default FAQPage;
