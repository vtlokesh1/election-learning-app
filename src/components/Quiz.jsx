import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeHelp, CheckCircle, Trophy, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Quiz data — expand here to add more questions.
 * Each question has: question text, answer options array, and the correct answer string.
 */
const quiz = [
  {
    question: "What is the minimum voting age in India?",
    options: ["16", "18", "21", "25"],
    correct: "18"
  },
  {
    question: "What does EVM stand for?",
    options: [
      "Electronic Voting Machine",
      "Election Validation Machine",
      "Electoral Voice Mechanism",
      "Early Voting Method"
    ],
    correct: "Electronic Voting Machine"
  },
  {
    question: "What is the purpose of NOTA?",
    options: [
      "New Official Tax Act",
      "None Of The Above",
      "National Organization of Teachers",
      "Nomination Of The Assembly"
    ],
    correct: "None Of The Above"
  },
  {
    question: "Which body conducts General Elections in India?",
    options: [
      "Supreme Court",
      "Election Commission of India",
      "Parliament of India",
      "President of India"
    ],
    correct: "Election Commission of India"
  },
  {
    question: "What is VVPAT used for in elections?",
    options: [
      "Verifying candidate nominations",
      "Providing a paper trail of votes",
      "Counting votes electronically",
      "Registering new voters"
    ],
    correct: "Providing a paper trail of votes"
  }
];

/**
 * Fires a confetti burst — called when user achieves a perfect score.
 */
function triggerConfetti() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }
    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
  }, 250);
}

export default function Quiz() {
  const { t } = useLanguage();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [hasFinished, setHasFinished] = useState(false);

  const answeredCount = Object.keys(selectedAnswers).length;
  const isQuizComplete = answeredCount === quiz.length;

  // Calculate score: count how many selected answers match the correct answer
  const score = quiz.reduce(
    (acc, item, index) => acc + (selectedAnswers[index] === item.correct ? 1 : 0),
    0
  );

  const handleFinish = () => {
    setHasFinished(true);
    if (score === quiz.length) {
      triggerConfetti();
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setHasFinished(false);
  };

  return (
    <section id="quiz" className="py-32 px-6 max-w-4xl mx-auto" aria-labelledby="quiz-heading">
      <div className="flex flex-col items-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 id="quiz-heading" className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            {t('quiz.title1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
              {t('quiz.title2')}
            </span>
          </h2>
        </motion.div>

        {/* Progress bar + live score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl mt-8"
          role="status"
          aria-live="polite"
          aria-label={`Quiz progress: ${answeredCount} of ${quiz.length} answered. Score: ${score}`}
          data-testid="quiz-progress"
        >
          <div className="flex justify-between text-slate-600 dark:text-slate-300 mb-4 font-bold text-lg">
            <span>Progress: {answeredCount}/{quiz.length}</span>
            <span>
              {t('quiz.score')}{' '}
              <span className="text-pink-500 font-black" data-testid="quiz-score">{score}</span>
            </span>
          </div>
          <div
            className="w-full bg-slate-200 dark:bg-slate-900 h-4 rounded-full overflow-hidden shadow-inner"
            role="progressbar"
            aria-valuenow={answeredCount}
            aria-valuemin={0}
            aria-valuemax={quiz.length}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(answeredCount / quiz.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-pink-500 to-orange-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {!hasFinished ? (
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {quiz.map((item, index) => {
              const isAnswered = selectedAnswers[index] !== undefined;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl border rounded-[2.5rem] shadow-xl p-8 transition-all duration-500",
                    isAnswered
                      ? "border-slate-300 dark:border-slate-700 opacity-80"
                      : "border-slate-200 dark:border-white/10"
                  )}
                  data-testid={`question-card-${index}`}
                >
                  <div className="flex items-start gap-4 mb-8">
                    <div className="p-4 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-2xl border border-pink-500/20" aria-hidden="true">
                      <BadgeHelp className="text-pink-500" size={32} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white leading-tight mt-1">
                      {item.question}
                    </h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4" role="group" aria-label={`Options for: ${item.question}`}>
                    {item.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswers[index] === option;
                      const isCorrect = option === item.correct;

                      let buttonClass =
                        'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-pink-500 dark:hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]';

                      if (isAnswered) {
                        if (isCorrect) {
                          buttonClass =
                            'bg-emerald-500/10 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]';
                        } else if (isSelected && !isCorrect) {
                          buttonClass =
                            'bg-rose-500/10 border-rose-500/50 text-rose-600 dark:text-rose-400';
                        } else {
                          buttonClass =
                            'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-50';
                        }
                      }

                      return (
                        <button
                          key={optionIndex}
                          disabled={isAnswered}
                          onClick={() =>
                            setSelectedAnswers({ ...selectedAnswers, [index]: option })
                          }
                          aria-label={`Answer option: ${option}`}
                          aria-pressed={isSelected}
                          data-testid={`option-${index}-${optionIndex}`}
                          className={cn(
                            "text-left px-6 py-5 rounded-2xl border-2 transition-all duration-300 font-semibold text-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-500/50",
                            buttonClass,
                            isSelected && !isAnswered && "scale-95"
                          )}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback message after answering */}
                  <AnimatePresence>
                    {isAnswered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                        className={cn(
                          "p-5 rounded-2xl border flex items-center gap-3",
                          selectedAnswers[index] === item.correct
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                        )}
                        role="alert"
                        data-testid={`feedback-${index}`}
                      >
                        {selectedAnswers[index] === item.correct ? (
                          <>
                            <CheckCircle size={24} className="flex-shrink-0" aria-hidden="true" />
                            <span className="font-bold text-lg">{t('quiz.success')}</span>
                          </>
                        ) : (
                          <>
                            <BadgeHelp size={24} className="flex-shrink-0" aria-hidden="true" />
                            <span className="font-bold text-lg">
                              {t('quiz.fail')} {item.correct}.
                            </span>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Show Results button only after all questions are answered */}
            {isQuizComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center pt-8"
              >
                <button
                  onClick={handleFinish}
                  data-testid="see-results-btn"
                  aria-label="See your quiz results"
                  className="px-10 py-5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full text-white font-black text-xl shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-500/50"
                >
                  See Results
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* Results screen */
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 p-12 rounded-[3rem] text-center shadow-2xl relative overflow-hidden"
            data-testid="results-screen"
            role="region"
            aria-label="Quiz Results"
          >
            {score === quiz.length && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.15)_0,transparent_70%)]" aria-hidden="true" />
            )}

            <motion.div
              animate={
                score === quiz.length
                  ? { rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }
                  : {}
              }
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 mb-8 shadow-[0_0_40px_rgba(236,72,153,0.6)]"
              aria-hidden="true"
            >
              <Trophy size={60} className="text-white drop-shadow-md" />
            </motion.div>

            <h3 className="text-5xl font-black text-slate-900 dark:text-white mb-4" data-testid="result-title">
              {score === quiz.length ? 'Perfect Score!' : 'Great Effort!'}
            </h3>

            <p className="text-2xl text-slate-600 dark:text-slate-300 mb-8" data-testid="result-score">
              You scored{' '}
              <span className="font-black text-pink-500">{score}</span>{' '}
              out of {quiz.length}
            </p>

            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto mb-10">
              {score === quiz.length ? t('quiz.msgExpert') : t('quiz.msgGood')}
            </p>

            <button
              onClick={handleReset}
              data-testid="reset-quiz-btn"
              aria-label="Take the quiz again"
              className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-500/50"
            >
              <span className="flex items-center gap-2">
                <RotateCcw size={18} aria-hidden="true" />
                {t('quiz.btnAgain')}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
