import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { DocumentArrowDownIcon, SparklesIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ScoreCard = ({ userName, totalQuestions, correctAnswers, onClose }) => {
  const scoreCardRef = useRef(null);
  const score = correctAnswers;
  const percentage = (score / totalQuestions) * 100;

  const downloadPDF = async () => {
    const element = scoreCardRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${userName}-score-card.pdf`);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50"
    >
      <div 
        ref={scoreCardRef}
        className="bg-white rounded-2xl p-8 max-w-md w-full relative overflow-hidden"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <SparklesIcon className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-purple-800 mb-2">Score Card</h2>
          <h3 className="text-xl text-gray-700 mb-6">{userName}</h3>

          <div className="space-y-4 mb-8">
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-purple-800 font-semibold">Total Questions</p>
              <p className="text-3xl font-bold">{totalQuestions}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-800 font-semibold">Correct Answers</p>
              <p className="text-3xl font-bold">{correctAnswers}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800 font-semibold">Score Percentage</p>
              <p className="text-3xl font-bold">{percentage.toFixed(1)}%</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadPDF}
              className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg flex items-center justify-center"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Download PDF
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg"
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScoreCard;
