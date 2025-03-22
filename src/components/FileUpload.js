import React from 'react';
import { motion } from 'framer-motion';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';

const FileUpload = ({ onUpload, loading }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/pdf') {
      onUpload(file);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-xl mx-auto"
    >
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-4 border-dashed border-purple-300 rounded-xl p-8 text-center"
      >
        <DocumentArrowUpIcon className="h-16 w-16 mx-auto text-purple-500 mb-4" />
        <h3 className="text-xl font-semibold mb-4">Drag & Drop your PDF here</h3>
        <p className="text-gray-500 mb-4">or</p>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => onUpload(e.target.files[0])}
          className="hidden"
          id="file-upload"
        />
        <motion.label
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg cursor-pointer inline-block"
          htmlFor="file-upload"
        >
          {loading ? 'Uploading...' : 'Select PDF File'}
        </motion.label>
      </div>
    </motion.div>
  );
};

export default FileUpload;
