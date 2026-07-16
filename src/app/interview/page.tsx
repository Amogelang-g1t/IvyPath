"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Video, CheckCircle2, AlertCircle, Play, StopCircle, RotateCcw } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { MentorEngine } from '../../api/mentorEngine';
import { LocalPersistenceService } from '../../api/localPersistence';

interface InterviewQuestion {
  id: string;
  question: string;
  category: 'Behavioral' | 'Academic' | 'Personal';
  tip: string;
}

const QUESTION_BANK: InterviewQuestion[] = [
  { id: 'q1', question: "Tell me about yourself and why you want to study at this institution.", category: 'Personal', tip: "Focus on your 'spike' and why this specific college's mission aligns with your goals." },
  { id: 'q2', question: "Describe a time you failed. What did you learn, and how did you recover?", category: 'Behavioral', tip: "Ivys love resilience. Be honest about the failure, but spend 70% of the answer on the recovery and growth." },
  { id: 'q3', question: "If you could have dinner with any historical figure, who would it be and why?", category: 'Academic', tip: "This tests your intellectual curiosity. Choose someone who reflects your academic passions." },
  { id: 'q4', question: "How do you handle conflict within a team of high-achieving peers?", category: 'Behavioral', tip: "Demonstrate emotional intelligence (EQ) and your ability to lead through collaboration." },
];

export default function InterviewPrep() {
  const { dreamCollege } = useAppStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showTip, setShowTip] = useState(false);

  const currentQuestion = QUESTION_BANK[currentQuestionIndex];

  const handleStartRecording = () => {
    setIsRecording(true);
    setFeedback(null);
    setShowTip(false);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // In a real app, we would use the Web Speech API here.
    // For the PoC, we simulate a "Review" based on the MentorEngine.
    setFeedback("Response captured. Analysis: Your tone was confident, but try to incorporate more specific examples of 'Leadership' as mentioned in your profile.");
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % QUESTION_BANK.length);
    setFeedback(null);
    setShowTip(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-stone-800">Interview Simulator</h1>
          <p className="text-stone-500 font-medium">Master the art of the Ivy League conversation.</p>
        </div >
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
            Session: {dreamCollege.toUpperCase()}
          </div >
        </div >
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Interaction Area */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="neu-flat p-8 space-y-8"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-stone-400 uppercase tracking-widest">
                {currentQuestion.category} Question
              </span >
              <span className="text-xs font-bold text-stone-500">
                Question {currentQuestionIndex + 1} of {QUESTION_BANK.length}
              </span >
            </div >

            <h2 className="text-2xl font-bold text-stone-800 leading-tight">
              "{currentQuestion.question}"
            </h2>

            <div className="flex justify-center py-10">
              <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                isRecording ? 'bg-red-100 scale-110' : 'bg-stone-100'
              }`}>
                {isRecording ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  >
                    <StopCircle className="w-8 h-8" />
                  </motion.div>
                ) : (
                  <button
                    onClick={handleStartRecording}
                    className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all"
                  >
                    <Mic className="w-8 h-8" />
                  </button>
                )}

                {isRecording && (
                   <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-20" />
                )}
              </div >
            </div >

            <div className="flex justify-center gap-4">
              {!isRecording && (
                <button
                  onClick={() => setShowTip(!showTip)}
                  className="neu-button text-stone-500 text-xs font-bold flex items-center gap-2"
                >
                  <Zap className="w-3 h-3" /> View Strategic Tip
                </button>
              )}
              {isRecording && (
                <button
                  onClick={handleStopRecording}
                  className="neu-button text-red-500 font-bold"
                >
                  Stop & Analyze
                </button>
              )}
            </div >
          </motion.div>

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="neu-flat p-6 bg-indigo-50/50 border border-indigo-100 space-y-3"
              >
                <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                  <Award className="w-4 h-4" /> AI Feedback
                </div >
                <p className="text-stone-700 leading-relaxed italic">
                  "{feedback}"
                </p>
                <button
                  onClick={nextQuestion}
                  className="mt-4 neu-button px-6 py-2 text-primary text-sm font-bold flex items-center gap-2"
                >
                  Next Question <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div >

        {/* Side Panel */}
        <div className="space-y-6">
          <div className="neu-flat p-6 space-y-4">
            <h3 className="text-sm font-black text-stone-400 uppercase tracking-widest">Interview Tips</h3>
            {showTip ? (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="p-4 rounded-xl bg-white shadow-inner text-sm text-stone-600 leading-relaxed border-l-4 border-primary"
              >
                {currentQuestion.tip}
              </motion.div>
            ) : (
              <div className="p-4 rounded-xl bg-stone-100 text-stone-400 text-sm italic text-center">
                Click "View Strategic Tip" to see the ideal approach for this question.
              </div >
            )}
          </div >

          <div className="neu-flat p-6 space-y-4">
            <h3 className="text-sm font-black text-stone-400 uppercase tracking-widest">Session Progress</h3>
            <div className="space-y-3">
              {QUESTION_BANK.map((q, i) => (
                <div key={q.id} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    i < currentQuestionIndex ? 'bg-green-500 text-white' : i === currentQuestionIndex ? 'bg-primary text-white animate-pulse' : 'bg-stone-200 text-stone-400'
                  }`}>
                    {i < currentQuestionIndex ? <CheckCircle2 className="w-4 h-4" /> : <span>{i + 1}</span>}
                  </div >
                  <span className={`text-xs font-medium ${i === currentQuestionIndex ? 'text-stone-800 font-bold' : 'text-stone-400'}`}>
                    {q.category}
                  </span >
                </div >
              ))}
            </div >
            <button
              onClick={() => {setCurrentQuestionIndex(0); setFeedback(null);}}
              className="w-full py-2 text-xs font-bold text-stone-400 hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3 h-3" /> Reset Session
            </button>
          </div >
        </div >
      </div >
    </div >
  );
}
