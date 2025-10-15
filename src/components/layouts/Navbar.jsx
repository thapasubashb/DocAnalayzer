import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 md:px-20 py-4 bg-black/70 backdrop-blur-sm z-20">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-white">
          Legal Analayzer <span className="text-xs text-gray-400">BETA</span>
        </span>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex space-x-8 text-sm text-gray-300">
        <a href="#features" className="hover:text-[#d4af37] transition-colors">
          Features
        </a>
        <a href="#what-you-get" className="hover:text-[#d4af37] transition-colors">
          What You Get
        </a>
        <a href="#compare" className="hover:text-[#d4af37] transition-colors">
          Compare
        </a>
        <a href="#pricing" className="hover:text-[#d4af37] transition-colors">
          Pricing
        </a>
        <a href="#faq" className="hover:text-[#d4af37] transition-colors">
          FAQ
        </a>
      </div>

      {/* Right Buttons */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-300 hover:text-[#d4af37] transition-colors">
          Login
        </button>
        <button className="bg-[#d4af37] text-black font-semibold px-4 py-2 rounded hover:bg-[#c29e2f] transition-colors">
          Register
        </button>
      </div>
    </nav>
    </>
  )
}

export default Navbar