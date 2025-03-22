import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import FileUpload from './components/FileUpload';
import MCQDisplay from './components/MCQDisplay';
import QuestionForm from './components/QuestionForm';
import axios from 'axios';
import { baseUrl } from './utils/config';

function App() {
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [mcqs, setMcqs] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      setLoading(true);
      await axios.post(`${baseUrl}/upload-pdf`, formData); // Removed unused response variable
      setPdfUploaded(true);
      toast.success('PDF uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload PDF');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSubmit = async (question) => {
    try {
      setLoading(true);
      console.log("Sending question to backend:", question);
      
      const response = await axios.post(`${baseUrl}/generate-mcqs`, {
        message: question
      });
      
      console.log("Full server response:", response.data);
      
      if (response.data.mcqs && Array.isArray(response.data.mcqs) && response.data.mcqs.length > 0) {
        // Validate MCQ structure before setting
        const validMcqs = response.data.mcqs.every(mcq => 
          mcq.id && 
          mcq.question && 
          Array.isArray(mcq.options) && 
          mcq.options.length === 4 &&
          mcq.correctAnswer
        );

        if (validMcqs) {
          setMcqs(response.data.mcqs);
          toast.success('MCQs generated successfully!');
        } else {
          throw new Error('Received malformed MCQ data');
        }
      } else {
        throw new Error('No MCQs received from server');
      }
    } catch (error) {
      console.error('MCQ generation error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to generate MCQs';
      toast.error(errorMessage);
      setMcqs(null); // Reset MCQs in case of error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      <Toaster position="top-right" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          PDF MCQ Generator
        </h1>

        {!pdfUploaded ? (
          <FileUpload onUpload={handleFileUpload} loading={loading} />
        ) : !mcqs ? (
          <QuestionForm onSubmit={handleQuestionSubmit} loading={loading} />
        ) : (
          <MCQDisplay 
            mcqs={mcqs} 
            onReset={() => {
              setMcqs(null);
              setPdfUploaded(false);
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

export default App;
