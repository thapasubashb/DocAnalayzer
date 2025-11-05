import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { Link } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";

const CaseFile = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [clauses, setClauses] = useState([]);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! Let's analyze your document." },
    { from: "bot", text: "Ask me anything about the uploaded file." },
  ]);
  const [input, setInput] = useState("");
  const [currentDocId, setCurrentDocId] = useState(null);

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    setMessages((p) => [...p, { from: "bot", text: "Uploading file..." }]);

    const res = await fetch(`${API_BASE}/upload/`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.text();
      setMessages((p) => [...p, { from: "bot", text: `Upload failed: ${err}` }]);
      return;
    }

    const data = await res.json();
    setSummary(data.summary);
    setClauses(data.clauses || []);
    setCurrentDocId(data.doc_id);

    setMessages((p) => [
      ...p,
      { from: "bot", text: "✅ File analyzed successfully." },
      { from: "bot", text: `Summary: ${data.summary}` },
    ]);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setSummary("");
    setClauses([]);
    setCurrentDocId(null);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((p) => [...p, { from: "user", text: input }]);
    const formData = new FormData();
    formData.append("question", input);
    if (currentDocId) formData.append("doc_id", currentDocId);

    setInput("");
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
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex overflow-hidden">
      <div className="w-1/3 min-h-screen p-8 flex flex-col items-start border-r border-gray-800">
        <Link to="/">
          <button className="mb-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
            Back to Home
          </button>
        </Link>

        <motion.div
          className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8 text-center w-full"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Upload className="mx-auto text-blue-400 mb-4" size={40} />
          <h2 className="text-white text-lg font-semibold mb-2">Upload Your Case File</h2>
          <p className="text-gray-400 text-sm mb-6">Supported formats: PDF, DOCX, TXT</p>
          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
            + Add File
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </motion.div>

        {file && (
          <motion.div
            className="mt-6 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 w-full flex justify-between items-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center space-x-3">
              <Upload className="text-blue-400" size={22} />
              <p className="text-white text-sm">{file.name}</p>
            </div>
            <button>
              <X
                size={18}
                onClick={handleRemoveFile}
                className="text-red-400 hover:text-red-500"
              />
            </button>
          </motion.div>
        )}

        {clauses.length > 0 && (
          <div className="mt-6 bg-gray-800 p-4 rounded-xl border border-gray-700 w-full text-sm">
            <h3 className="text-white font-semibold mb-2">Detected Clauses:</h3>
            <ul className="space-y-1">
              {clauses.map((c, i) => (
                <li key={i} className="text-gray-300">
                  <span className="text-blue-400 font-medium">{c.keyword}:</span> {c.sentence}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <motion.div className="flex-1 flex flex-col bg-gray-900" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs md:max-w-md p-3 rounded-xl text-sm ${msg.from === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-200"}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 p-4 flex items-center bg-gray-900">
          <input type="text" placeholder="Type a message..." className="flex-1 px-3 py-2 text-sm bg-gray-800 text-white rounded-l-md outline-none" value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md text-sm text-white">Send</button>
        </div>
      </motion.div>
    </div>
  );
};

export default CaseFile;
