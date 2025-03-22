import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import ScoreCard from './ScoreCard';

const MCQDisplay = ({ mcqs, onReset }) => {
  const [userName, setUserName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showScoreCard, setShowScoreCard] = useState(false);

  // Debug log to check mcqs data
  console.log('MCQs received:', mcqs);

  const calculateScore = () => {
    let correct = 0;
    mcqs.forEach(mcq => {
      if (selectedAnswers[mcq.id] === mcq.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setNameSubmitted(true);
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
    setShowScoreCard(true);
  };

  if (!nameSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto"
      >
        <form onSubmit={handleNameSubmit} className="bg-white rounded-lg shadow-lg p-6 text-center">
          <UserCircleIcon className="h-16 w-16 mx-auto text-purple-500 mb-4" />
          <h2 className="text-xl font-semibold mb-4">Enter Your Name</h2>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            placeholder="Your Name"
            required
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg"
          >
            Start Quiz
          </motion.button>
        </form>
      </motion.div>
    );
  }

  // Add check for mcqs data
  if (!mcqs || !Array.isArray(mcqs) || mcqs.length === 0) {
    return (
      <div className="text-center text-red-600">
        No questions available. Please try again.
      </div>
    );
  }

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 1, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto"
      >
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-purple-800">Welcome, {userName}!</h2>
          <p className="text-gray-600">Please answer all questions to submit the quiz.</p>
        </div>

        {mcqs.map((mcq, index) => (
          <motion.div
            key={mcq.id}
            variants={item}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
          >
            <h3 className="text-lg font-semibold mb-4">
              {index + 1}. {mcq.question}
            </h3>
            <div className="space-y-3">
              {mcq.options && mcq.options.map((option, optIndex) => (
                <motion.button
                  key={optIndex}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedAnswers(prev => ({
                      ...prev,
                      [mcq.id]: option
                    }));
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedAnswers[mcq.id] === option
                      ? 'bg-purple-100 border border-purple-500'
                      : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            {showResults && (
              <div className="mt-4 text-sm">
                {selectedAnswers[mcq.id] === mcq.correctAnswer ? (
                  <span className="text-green-600">Correct!</span>
                ) : (
                  <span className="text-red-600">
                    Incorrect. Correct answer: {mcq.correctAnswer}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        ))}
        
        <div className="flex justify-center space-x-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShowResults}
            disabled={Object.keys(selectedAnswers).length !== mcqs.length}
            className={`px-6 py-3 rounded-lg ${
              Object.keys(selectedAnswers).length === mcqs.length
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {Object.keys(selectedAnswers).length === mcqs.length
              ? 'Submit Quiz'
              : `Answer all questions (${Object.keys(selectedAnswers).length}/${mcqs.length})`}
          </motion.button>
        </div>
      </motion.div>

      {showScoreCard && (
        <ScoreCard
          userName={userName}
          totalQuestions={mcqs.length}
          correctAnswers={calculateScore()}
          onClose={() => {
            setShowScoreCard(false);
            onReset();
          }}
        />
      )}
    </>
  );
};

export default MCQDisplay;
