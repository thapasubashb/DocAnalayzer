import React from 'react'

const Home = () => {
  return (
    <>
     <section className="relative min-h-screen bg-gradient-to-t from-blue-600 to-red-600  text-white flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20 overflow-hidden">
      {/* Background */}


      {/* Left content */}
      <div className="relative z-10 max-w-xl space-y-6">
        <p className="text-sm tracking-widest text-gray-300 uppercase">
          Law & AI • India First
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-[#d4af37] leading-tight">
          Where Law meets AI.
        </h1>
        <p className="text-gray-300 leading-relaxed">
          Swastik AI — Where Law Meets AI. Upload judgments & pleadings and
          receive structured briefs in seconds: facts, issues, holding, reasoning & orders.
        </p>

        <div className="flex gap-4 pt-4">
          <button className="bg-[#d4af37] text-black font-semibold px-6 py-2 rounded-md hover:bg-[#c29e2f] transition-colors">
            Upload a Case
          </button>
          <button className="border border-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
            See how it works
          </button>
        </div>
      </div>

      {/* Right image */}
      <div className="relative z-10 mt-12 md:mt-0 flex justify-center">
        <img
          src="/lady-justice.png"
          alt="Lady Justice"
          className="max-h-[500px] md:max-h-[650px] drop-shadow-2xl"
        />
      </div>
    </section>
    </>
  )
}

export default Home