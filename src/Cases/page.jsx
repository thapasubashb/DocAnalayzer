import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { Link } from "react-router-dom";

const CaseFile = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };
  return (
    <div className="relative min-h-screen bg-gray-900 flex overflow-hidden">
      {/* Left Panel */}
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
          <h2 className="text-white text-lg font-semibold mb-2">
            Upload Your Case File
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Supported formats: PDF, DOCX, TXT
          </p>
          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
            + Add File
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </motion.div>

        {/* Example of uploaded file display (static) */}
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
      </div>

      {/* Right Chat Section */}
      <motion.div
        className="flex-1 flex flex-col bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          <div className="flex justify-start">
            <div className="max-w-xs md:max-w-md p-3 rounded-xl text-sm bg-gray-800 text-gray-200">
              Hello! Let's analyze your document.
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-xs md:max-w-md p-3 rounded-xl text-sm bg-gray-800 text-gray-200">
              Ask me anything about the uploaded file.
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-xs md:max-w-md p-3 rounded-xl text-sm bg-blue-600 text-white">
              What is inside the report?
            </div>
          </div>
        </div>

        {/* Input Field */}
        <div className="border-t border-gray-800 p-4 flex items-center bg-gray-900">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 text-sm bg-gray-800 text-white rounded-l-md outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md text-sm text-white">
            Send
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CaseFile;
