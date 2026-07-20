import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Send, ArrowLeft, FileText, Scale, Loader2 } from "lucide-react";
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
    <div className="prose prose-invert max-w-none prose-sm sm:prose-base text-gray-100 prose-p:leading-relaxed prose-pre:bg-gray-900/50">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{display}</ReactMarkdown>
    </div>
  );
}

const CaseFile = () => {
  const [file, setFile] = useState(null);
  const [clauses, setClauses] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! Let's analyze your document." },
    { from: "bot", text: "Upload a file on the left, then ask me anything about its contents." },
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

    setMessages((p) => [...p, { from: "bot", text: "⏳ Processing and indexing your document. Please wait..." }]);

    try {
      const res = await fetch(`${API_BASE}/upload/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.text();
        setMessages((p) => [
          ...p,
          { from: "bot", text: `❌ Upload failed: ${err}` },
        ]);
        return;
      }

      const data = await res.json();
      setClauses(data.clauses || []);
      setCurrentDocId(data.doc_id);

      setMessages((p) => [
        ...p,
        { from: "bot", text: "✅ **File analyzed successfully.**" },
        { from: "bot", text: `### Document Summary\n${data.summary}` },
      ]);
    } catch (error) {
      setMessages((p) => [...p, { from: "bot", text: "❌ Connection error while uploading document." }]);
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
      setMessages((p) => [...p, { from: "bot", text: "System error: Unable to deliver message." }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* Left Sidebar Panel */}
      <motion.div
        className="w-96 flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col h-screen"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition group">
            <ArrowLeft size={16} className="transform group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-semibold bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/20">
            <Scale size={12} /> Legal AI
          </div>
        </div>

        {/* Sidebar Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-800">
          
          {/* Upload Card */}
          <div className="relative">
            <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
            <label
              htmlFor="file-upload"
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition group relative overflow-hidden
                ${isUploading ? "border-blue-500/40 bg-blue-500/5 cursor-not-allowed" : "border-gray-700 hover:border-blue-500/50 bg-gray-800/40 hover:bg-gray-800/80"}`}
            >
              {isUploading ? (
                <Loader2 className="animate-spin text-blue-400 mb-3" size={32} />
              ) : (
                <Upload className="text-gray-400 group-hover:text-blue-400 mb-3 transition-colors" size={32} />
              )}
              <span className="text-sm font-medium text-gray-200 block mb-1">
                {isUploading ? "Analyzing Document..." : "Upload Case File"}
              </span>
              <span className="text-xs text-gray-500">PDF, DOCX, or TXT up to 25MB</span>
            </label>
          </div>

          {/* Active File State Container */}
          <AnimatePresence>
            {file && (
              <motion.div
                className="bg-gray-800/60 border border-gray-700/80 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 flex-shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-gray-200 truncate">{file.name}</p>
                    <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="p-1.5 hover:bg-gray-700 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                  aria-label="Remove document"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Extracted Clauses Accordion/List Section */}
          {clauses.length > 0 && (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-1">Detected Clauses</h3>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {clauses.map((c, i) => (
                  <div key={i} className="p-3 bg-gray-800/30 border border-gray-800 rounded-lg hover:border-gray-700 transition">
                    <div className="text-xs font-medium text-blue-400 mb-1 capitalize">
                      {c.keyword.replace(/_/g, " ")}
                    </div>
                    <div className="text-xs text-gray-300 leading-relaxed">
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
      <div className="flex-1 flex flex-col bg-gray-950 h-screen relative">
        
        {/* Empty Chat Spaceholder */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-800">
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
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-md flex-shrink-0 mt-1">
                        AI
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-5 py-4 rounded-2xl shadow-sm text-sm border ${
                        isUser
                          ? "bg-blue-600 border-blue-500 text-white rounded-tr-none"
                          : "bg-gray-900 border-gray-850 text-gray-200 rounded-tl-none"
                      }`}
                    >
                      {message.from === "bot" ? (
                        <TypingText text={message.text} />
                      ) : (
                        <div className="whitespace-pre-wrap leading-relaxed">{message.text}</div>
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
        <div className="p-6 bg-gradient-to-t from-gray-950 via-gray-950 to-transparent">
          <div className="max-w-3xl mx-auto relative bg-gray-900 border border-gray-800 rounded-xl p-2 flex items-center shadow-2xl focus-within:border-blue-500/50 transition-colors">
            <input
              type="text"
              placeholder={file ? "Ask a question about this file..." : "Upload a case file to get started..."}
              disabled={!file}
              className="flex-1 px-4 py-2.5 bg-transparent text-white placeholder-gray-500 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || !file}
              className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-lg transition shadow-md flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
              aria-label="Send query"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseFile;