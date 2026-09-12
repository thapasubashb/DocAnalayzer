import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#050816] border-t border-slate-800 px-6 py-12 text-slate-300 md:px-20">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div>
          <h2 className="mb-3 text-xl font-semibold text-[#f5d77a]">
            Legal Analayzer
          </h2>
          <p className="text-sm leading-7 text-slate-400">
            AI-powered legal intelligence for structured case summaries, brief
            generation, and citation tracking — built for precision and speed.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold text-[#f5d77a]">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="transition-colors hover:text-[#f5d77a]">
                Home
              </a>
            </li>
            <li>
              <a
                href="/what-you-get"
                className="transition-colors hover:text-[#f5d77a]"
              >
                What You Get
              </a>
            </li>
            <li>
              <a href="/faq" className="transition-colors hover:text-[#f5d77a]">
                FAQ
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="transition-colors hover:text-[#f5d77a]"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold text-[#f5d77a]">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/privacy"
                className="transition-colors hover:text-[#f5d77a]"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="transition-colors hover:text-[#f5d77a]"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="/disclaimer"
                className="transition-colors hover:text-[#f5d77a]"
              >
                Disclaimer
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold text-[#f5d77a]">Contact</h3>
          <p className="text-sm leading-7 text-slate-400">
            thapasubash9072@gmail.com
            <br />
            Bangalore, India
          </p>
          <div className="mt-4 flex space-x-4 text-lg">
            <a href="#" className="transition-colors hover:text-[#f5d77a]">
              🐦
            </a>
            <a href="#" className="transition-colors hover:text-[#f5d77a]">
              💼
            </a>
            <a href="#" className="transition-colors hover:text-[#f5d77a]">
              📘
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Legal Analayzer. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
