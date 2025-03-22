import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuestionForm = ({ onSubmit, loading }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Enter your question</h2>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          placeholder="E.g., Generate questions about JavaScript fundamentals"
          rows="4"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 rounded-lg"
        >
          {loading ? 'Generating Questions...' : 'Generate MCQs'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default QuestionForm;
