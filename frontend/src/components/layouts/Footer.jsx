import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="bg-black text-gray-300 border-t border-gray-800 py-10 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-[#d4af37] mb-3">
             Legal Analayzer
          </h2>
          <p className="text-sm text-gray-400">
            AI-powered legal intelligence for structured case summaries, brief generation,
            and citation tracking — built for precision and speed.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-[#d4af37] mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-[#d4af37]">Home</a></li>
            <li><a href="/what-you-get" className="hover:text-[#d4af37]">What You Get</a></li>
            <li><a href="/faq" className="hover:text-[#d4af37]">FAQ</a></li>
            <li><a href="/contact" className="hover:text-[#d4af37]">Contact</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-[#d4af37] mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy" className="hover:text-[#d4af37]">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-[#d4af37]">Terms of Service</a></li>
            <li><a href="/disclaimer" className="hover:text-[#d4af37]">Disclaimer</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-[#d4af37] mb-3">Contact</h3>
          <p className="text-sm text-gray-400">
            thapasubash9072@gmail.com<br />
            banglore, India
          </p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-[#d4af37] text-lg">🐦</a>
            <a href="#" className="hover:text-[#d4af37] text-lg">💼</a>
            <a href="#" className="hover:text-[#d4af37] text-lg">📘</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}  AI. All rights reserved.
      </div>
    </footer>
    </>
  )
}

export default Footer