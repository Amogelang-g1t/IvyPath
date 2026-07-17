import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, CheckCircle2, Zap, Award, ChevronRight, StopCircle, RotateCcw } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

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
          <h1 className="text-3xl font-black">Interview Simulator</h1>
          <p className="text-[var(--ivy-text-secondary)] font-medium">Master the art of the Ivy League conversation.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-[24px] bg-[var(--ivy-accent-glow)] border border-[var(--ivy-accent)] text-[var(--ivy-accent)] text-[0.75rem] font-bold uppercase tracking-[0.08em]">
            Session: {dreamCollege.toUpperCase()}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Interaction Area */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 space-y-8"
          >
            <div className="flex justify-between items-center pb-4 border-b border-[var(--ivy-border)]">
              <span className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em]">
                {currentQuestion.category} Question
              </span>
              <span className="text-[0.75rem] font-bold text-[var(--ivy-text-secondary)]">
                Question {currentQuestionIndex + 1} of {QUESTION_BANK.length}
              </span>
            </div>

            <h2 className="text-2xl font-bold leading-tight">
              "{currentQuestion.question}"
            </h2>

            <div className="flex justify-center py-10">
              <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                isRecording ? 'scale-110' : ''
              }`}>
                {isRecording ? (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-16 h-16 bg-[var(--ivy-danger)] rounded-full flex items-center justify-center text-[#0B1220] shadow-lg cursor-pointer"
                    onClick={handleStopRecording}
                  >
                    <StopCircle className="w-8 h-8" />
                  </motion.div>
                ) : (
                  <button
                    onClick={handleStartRecording}
                    className="w-16 h-16 bg-[var(--ivy-accent)] rounded-full flex items-center justify-center text-[#0B1220] shadow-lg hover:scale-105 transition-all"
                  >
                    <Mic className="w-8 h-8" />
                  </button>
                )}
                {isRecording && (
                  <div className="absolute inset-0 rounded-full border-4 border-[var(--ivy-danger)] animate-ping opacity-20" />
                )}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              {!isRecording && (
                <button
                  onClick={() => setShowTip(!showTip)}
                  className="btn-ghost text-xs"
                >
                  <Zap className="w-3 h-3 mr-2" /> View Strategic Tip
                </button>
              )}
            </div>
          </motion.div>

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-panel p-6 border-l-4 border-l-[var(--ivy-accent)] space-y-3"
              >
                <div className="flex items-center gap-2 text-[var(--ivy-accent)] font-bold text-[0.75rem] uppercase tracking-[0.08em]">
                  <Award className="w-4 h-4" /> AI Feedback
                </div>
                <p className="text-[var(--ivy-text-secondary)] leading-relaxed italic">"{feedback}"</p>
                <button
                  onClick={nextQuestion}
                  className="mt-4 btn-primary text-sm w-full"
                >
                  Next Question <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em]">Interview Tips</h3>
            {showTip ? (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="p-4 rounded-xl bg-[var(--ivy-bg-elevated)] border border-[var(--ivy-border)] border-l-4 border-l-[var(--ivy-accent)] text-sm text-[var(--ivy-text-secondary)] leading-relaxed"
              >
                {currentQuestion.tip}
              </motion.div>
            ) : (
              <div className="p-4 rounded-xl border border-[var(--ivy-border)] bg-[rgba(255,255,255,0.02)] text-[var(--ivy-text-muted)] text-sm italic text-center">
                Click "View Strategic Tip" to see the ideal approach for this question.
              </div>
            )}
          </div>

          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em]">Session Progress</h3>
            <div className="space-y-3">
              {QUESTION_BANK.map((q, i) => (
                <div key={q.id} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    i < currentQuestionIndex ? 'bg-[var(--ivy-success)] text-[#0B1220]' : i === currentQuestionIndex ? 'bg-[var(--ivy-accent)] text-[#0B1220] animate-pulse' : 'bg-[var(--ivy-bg-elevated)] border border-[var(--ivy-border)] text-[var(--ivy-text-muted)]'
                  }`}>
                    {i < currentQuestionIndex ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                  </div>
                  <span className={`text-xs font-medium ${i === currentQuestionIndex ? 'text-[var(--ivy-text-primary)] font-bold' : 'text-[var(--ivy-text-muted)]'}`}>
                    {q.category}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-[var(--ivy-border)]">
              <button
                onClick={() => { setCurrentQuestionIndex(0); setFeedback(null); }}
                className="w-full py-2 text-xs font-bold text-[var(--ivy-text-muted)] hover:text-[var(--ivy-accent)] transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3 h-3" /> Reset Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}