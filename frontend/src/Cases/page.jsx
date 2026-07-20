import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Send, ArrowLeft, FileText, Scale, Loader2, ShieldCheck, CornerDownLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_BASE = "http://127.0.0.1:8000";

// Typing animation + markdown renderer
function TypingText({ text, speed = 12, onComplete }) {
  const [display, setDisplay] = useState("");
  const iRef = useRef(0);

  useEffect(() => {
    setDisplay("");
    iRef.current = 0;
    if (!text) return;

    const timer = setInterval(() => {
      iRef.current += 1;
      setDisplay(text.slice(0, iRef.current));
      if (iRef.current >= text.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return (
    <div className="prose prose-invert max-w-none prose-sm sm:prose-base text-zinc-200 prose-p:leading-relaxed prose-pre:bg-zinc-950/60 prose-strong:text-emerald-400 prose-headings:text-zinc-100 prose-headings:font-semibold">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{display}</ReactMarkdown>
    </div>
  );
}

const CaseFile = () => {
  const [file, setFile] = useState(null);
  const [clauses, setClauses] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Welcome counsel. Secure analysis pipeline established." },
    { from: "bot", text: "Upload your legal case brief, contract, or documentation to get started. I will index the contents for dynamic discovery queries." },
  ]);
  const [input, setInput] = useState("");
  const [currentDocId, setCurrentDocId] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    setMessages((p) => [...p, { from: "bot", text: "⏳ **Vectorizing System:** Parsing structure and indexing document metadata..." }]);

    try {
      const res = await fetch(`${API_BASE}/upload/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.text();
        setMessages((p) => [
          ...p,
          { from: "bot", text: `❌ **Processing Terminated:** ${err}` },
        ]);
        return;
      }

      const data = await res.json();
      setClauses(data.clauses || []);
      setCurrentDocId(data.doc_id);

      setMessages((p) => [
        ...p,
        { from: "bot", text: "✅ **Analysis complete.** Document structures mapped out successfully." },
        { from: "bot", text: `### Executive Abstract\n${data.summary}` },
      ]);
    } catch (error) {
      setMessages((p) => [...p, { from: "bot", text: "❌ **Network Error:** Could not bridge connection to the analytical server." }]);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setClauses([]);
    setCurrentDocId(null);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userQuery = input;
    setMessages((p) => [...p, { from: "user", text: userQuery }]);
    setInput("");

    const formData = new FormData();
    formData.append("question", userQuery);
    if (currentDocId) formData.append("doc_id", currentDocId);

    try {
      const res = await fetch(`${API_BASE}/ask/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.text();
        setMessages((p) => [...p, { from: "bot", text: `Error: ${err}` }]);
        return;
      }

      const data = await res.json();
      setMessages((p) => [...p, { from: "bot", text: data.answer }]);
    } catch (error) {
      setMessages((p) => [...p, { from: "bot", text: "System error: Failed to process document retrieval context." }]);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex overflow-hidden font-sans antialiased selection:bg-emerald-500/20">
      
      {/* Left Sidebar Panel */}
      <motion.div
        className="w-[26rem] flex-shrink-0 bg-[#0f0f12] border-r border-zinc-800/80 flex flex-col h-screen"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-zinc-800/60 flex items-center justify-between bg-[#121217]/50 backdrop-blur-md">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-zinc-400 hover:text-zinc-200 transition group uppercase">
            <ArrowLeft size={14} className="transform group-hover:-translate-x-0.5 transition-transform text-emerald-500" />
            Terminal Home
          </Link>
          <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-md border border-emerald-500/20 shadow-sm shadow-emerald-500/5">
            <Scale size={12} className="text-emerald-500" /> LexAI Core
          </div>
        </div>

        {/* Sidebar Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          
          {/* Upload Card */}
          <div className="relative">
            <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
            <label
              htmlFor="file-upload"
              className={`flex flex-col items-center justify-center border border-dashed rounded-xl p-8 text-center cursor-pointer transition relative overflow-hidden group
                ${isUploading 
                  ? "border-emerald-500/40 bg-emerald-500/5 cursor-not-allowed" 
                  : "border-zinc-800 hover:border-emerald-500/40 bg-[#141419]/40 hover:bg-[#16161e]/70 shadow-inner"}`}
            >
              {isUploading ? (
                <Loader2 className="animate-spin text-emerald-400 mb-4" size={28} />
              ) : (
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl mb-4 group-hover:border-emerald-500/30 group-hover:bg-zinc-800/50 transition-all duration-300">
                  <Upload className="text-zinc-400 group-hover:text-emerald-400 transition-colors" size={22} />
                </div>
              )}
              <span className="text-sm font-medium text-zinc-200 block mb-1 tracking-wide">
                {isUploading ? "Ingesting Repository..." : "Load Case Dossier"}
              </span>
              <span className="text-xs text-zinc-500">Secure PDF, DOCX, or TXT up to 25MB</span>
            </label>
          </div>

          {/* Active File State Container */}
          <AnimatePresence>
            {file && (
              <motion.div
                className="bg-[#131318]/90 border border-zinc-800 rounded-xl p-4 flex items-center justify-between gap-3 shadow-md shadow-black/40 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 flex-shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-zinc-300 truncate tracking-wide">{file.name}</p>
                    <p className="text-[10px] font-mono tracking-tighter text-zinc-500 uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="p-1.5 hover:bg-zinc-800 border border-transparent hover:border-zinc-700 text-zinc-400 hover:text-rose-400 rounded-lg transition-all duration-200"
                  aria-label="Remove document"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Extracted Clauses Accordion/List Section */}
          {clauses.length > 0 && (
            <motion.div
              className="space-y-3 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center gap-2 px-1">
                <ShieldCheck size={14} className="text-emerald-400" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Isolated Provisions</h3>
              </div>
              <div className="space-y-2 max-h-[22rem] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
                {clauses.map((c, i) => (
                  <div key={i} className="p-3.5 bg-[#121217]/40 border border-zinc-800/80 rounded-xl hover:border-zinc-700/60 hover:bg-[#14141b]/70 transition-all duration-200 group">
                    <div className="text-[10px] font-bold tracking-wider text-emerald-400 mb-1.5 uppercase font-mono">
                      // {c.keyword.replace(/_/g, " ")}
                    </div>
                    <div className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                      {c.sentence}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Primary Chat Container */}
      <div className="flex-1 flex flex-col bg-[#09090b] h-screen relative">
        
        {/* Chat Message Workspace */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => {
                const isUser = message.from === "user";
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-bold tracking-wider text-emerald-400 shadow-md flex-shrink-0 mt-0.5">
                        LX
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] px-5 py-4 rounded-2xl shadow-xl text-sm leading-relaxed border ${
                        isUser
                          ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-100 rounded-tr-none"
                          : "bg-[#0f0f12] border-zinc-800/80 text-zinc-200 rounded-tl-none"
                      }`}
                    >
                      {message.from === "bot" ? (
                        <TypingText text={message.text} />
                      ) : (
                        <div className="whitespace-pre-wrap text-zinc-100 font-medium">{message.text}</div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Floating Style Input Action Bar */}
        <div className="p-6 bg-gradient-to-t from-[#09090b] via-[#09090b]/90 to-transparent">
          <div className="max-w-3xl mx-auto relative bg-[#0f0f12] border border-zinc-800 rounded-xl p-2 flex items-center shadow-2xl focus-within:border-emerald-500/30 transition-all duration-300">
            <input
              type="text"
              placeholder={file ? "Interrogate deep vector space regarding this file..." : "Please initialize parameters by uploading a dossier dossier..."}
              disabled={!file}
              className="flex-1 px-4 py-3 bg-transparent text-zinc-100 placeholder-zinc-600 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-40"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            
            {/* Enter Key Visual Indicator Hint */}
            {input.trim() && file && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono tracking-tighter text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-md mr-2 animate-fade-in">
                <CornerDownLeft size={10} /> Enter
              </span>
            )}

            <button
              onClick={handleSend}
              disabled={!input.trim() || !file}
              className="p-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-900 disabled:text-zinc-700 text-zinc-950 rounded-lg transition-all duration-200 shadow-lg font-bold flex items-center justify-center cursor-pointer disabled:cursor-not-allowed border border-emerald-400/20 disabled:border-transparent"
              aria-label="Send query"
            >
              <Send size={14} className="fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseFile;