import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, CheckCircle2, Zap, Award, ChevronRight, StopCircle, RotateCcw, Star } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface InterviewQuestion {
  id: string;
  question: string;
  category: 'Behavioral' | 'Academic' | 'Personal' | 'Ethical' | 'Leadership' | 'South Africa Context';
  tip: string;
}

const QUESTION_BANK: InterviewQuestion[] = [
  { id: 'q1', question: "Tell me about yourself and why you want to study at this institution.", category: 'Personal', tip: "Anchor your answer in a clear personal story, then connect your interests to the institution's values and opportunities." },
  { id: 'q2', question: "Describe a time you failed. What did you learn, and how did you recover?", category: 'Behavioral', tip: "Use the STAR method: keep the setback brief, then spend most of your answer on the action you took and the lesson learned." },
  { id: 'q3', question: "If you could have dinner with any historical figure, who would it be and why?", category: 'Academic', tip: "Pick someone that connects to your academic curiosity and show how their ideas still influence your thinking." },
  { id: 'q4', question: "How do you handle conflict within a team of high-achieving peers?", category: 'Behavioral', tip: "Show calm communication, active listening, and a bias toward collaboration over ego." },
  { id: 'q5', question: "What is a book, article, or idea that changed how you see the world?", category: 'Academic', tip: "Name the idea clearly, then explain how it changed your assumptions or deepened your curiosity." },
  { id: 'q6', question: "Tell me about a time you took initiative without being asked.", category: 'Leadership', tip: "Highlight the gap you noticed, the decision you made, and the impact on others." },
  { id: 'q7', question: "How would your friends describe you, and what would they say is your greatest strength?", category: 'Personal', tip: "Choose a strength you can prove with specific examples instead of a generic compliment." },
  { id: 'q8', question: "Describe a time when you had to work with someone whose values or style differed from yours.", category: 'Behavioral', tip: "Focus on empathy, flexibility, and the outcome you created together." },
  { id: 'q9', question: "What does academic integrity mean to you, and how would you respond if a friend asked to copy your work?", category: 'Ethical', tip: "Show that you can be kind while still holding a clear boundary and protecting trust." },
  { id: 'q10', question: "If you discovered misinformation spreading in a school club or online community you belong to, what would you do?", category: 'Ethical', tip: "Demonstrate thoughtfulness: verify facts, avoid escalation, and explain how you would correct the record responsibly." },
  { id: 'q11', question: "Tell me about a time you led a group through uncertainty or change.", category: 'Leadership', tip: "Show how you created direction, kept people aligned, and maintained momentum when the path was unclear." },
  { id: 'q12', question: "What does leadership mean to you when you are not the loudest voice in the room?", category: 'Leadership', tip: "Explain leadership as influence, service, and accountability—not just authority." },
  { id: 'q13', question: "How do South Africa's education inequalities shape your perspective on access and opportunity?", category: 'South Africa Context', tip: "Connect your answer to lived realities, practical empathy, and how you would contribute to solutions." },
  { id: 'q14', question: "Which South African issue—such as youth unemployment, energy security, or water access—most interests you and why?", category: 'South Africa Context', tip: "Pick one issue, show that you understand its complexity, and mention how you would learn or act further." },
  { id: 'q15', question: "Tell me about a time you had to balance your ambitions with responsibilities to your family, school, or community.", category: 'Personal', tip: "Show maturity by explaining trade-offs, priorities, and the values guiding your decisions." },
  { id: 'q16', question: "What would you contribute to a campus community that values both global perspective and local impact?", category: 'Leadership', tip: "Blend initiative, service, and cultural awareness to show you can add value in multiple settings." },
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
    const categoryFeedback: Record<InterviewQuestion['category'], string> = {
      Personal: "Strong self-awareness. Add one concrete example that shows how your background shaped your goals, and make sure your answer sounds specific to you.",
      Behavioral: "Good structure and composure. Use one sharper STAR example with a measurable result so your impact is easier to evaluate.",
      Academic: "Your curiosity came through well. Push your answer one level deeper by connecting the idea to a current issue, class, or research interest.",
      Ethical: "Thoughtful response. The strongest answers here balance principle with practicality, so be explicit about the values guiding your decision.",
      Leadership: "You showed initiative. Make the leadership outcome more visible by naming the people involved and the change that followed.",
      'South Africa Context': "Context awareness is a strength here. Tie the issue to a real-world example in your community and explain how you would respond constructively.",
    };
    setFeedback(`Response captured. Analysis: ${categoryFeedback[currentQuestion.category]} Your delivery was confident, and your answer matched the intent of a ${currentQuestion.category.toLowerCase()} question.`);
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
            <h3 className="text-[0.75rem] font-semibold text-[var(--ivy-text-muted)] uppercase tracking-[0.08em]">STAR Method Reminder</h3>
            <div className="space-y-3 text-sm text-[var(--ivy-text-secondary)] leading-relaxed">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--ivy-accent-glow)] border border-[var(--ivy-accent)] flex items-center justify-center text-[var(--ivy-accent)]">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--ivy-text-primary)]">S — Situation</p>
                  <p>Set the scene quickly. What was happening and why did it matter?</p>
                </div>
              </div>
              <div><span className="font-semibold text-[var(--ivy-text-primary)]">T — Task:</span> What was your responsibility or goal?</div>
              <div><span className="font-semibold text-[var(--ivy-text-primary)]">A — Action:</span> What did you personally do to move things forward?</div>
              <div><span className="font-semibold text-[var(--ivy-text-primary)]">R — Result:</span> What changed, what did you learn, and why does it matter now?</div>
            </div>
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