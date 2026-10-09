import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Lesson, UserProfile } from '../types';
import { recordLessonComplete } from '../services/storage';
import { runPythonCode } from '../services/pythonRunner';
import {
  ChevronLeft,
  BookOpen,
  Sparkles,
  Play,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  Code2,
  Loader2,
  Trophy,
} from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  user: UserProfile;
  onBack: () => void;
  onJumpToChallenge: (challengeId: string) => void;
  onUserUpdate: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  user,
  onBack,
  onJumpToChallenge,
  onUserUpdate,
}) => {
  const isCompleted = user.completedLessons.includes(lesson.id);

  // State for interactive code runners inside lesson sections
  const [runningSectionIdx, setRunningSectionIdx] = useState<number | null>(null);
  const [sectionOutputs, setSectionOutputs] = useState<Record<number, string>>({});

  // State for quiz
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const handleRunExample = async (idx: number, code: string) => {
    setRunningSectionIdx(idx);
    try {
      const res = await runPythonCode(code);
      const text = res.error ? `Error: ${res.error}` : (res.stdout || 'Program completed with no output.');
      setSectionOutputs((prev) => ({ ...prev, [idx]: text }));
    } catch (err: any) {
      setSectionOutputs((prev) => ({ ...prev, [idx]: `Execution failed: ${err?.message}` }));
    } finally {
      setRunningSectionIdx(null);
    }
  };

  const handleCompleteLesson = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10B981', '#3B82F6'],
      });
    } catch (e) {
      // ignore
    }

    const { newlyUnlocked } = recordLessonComplete(lesson.id, lesson.xp);
    setNewBadges(newlyUnlocked);
    setShowCelebration(true);
    onUserUpdate();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Quest Map</span>
        </button>

        <div className="flex items-center gap-2">
          {isCompleted && (
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Completed
            </span>
          )}
          <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+{lesson.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Lesson Title & Summary */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Interactive Lesson · ~{lesson.estimatedMinutes} Mins</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {lesson.title}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {lesson.summary}
        </p>
      </div>

      {/* Structured Sections */}
      <div className="space-y-8">
        {lesson.sections.map((sec, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-sm"
          >
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                0{idx + 1}
              </span>
              <span>{sec.title}</span>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {sec.content}
            </p>

            {sec.codeExample && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden space-y-0">
                <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">Python Interactive Preview</span>
                  <button
                    onClick={() => handleRunExample(idx, sec.codeExample!)}
                    disabled={runningSectionIdx === idx}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-[11px] transition-colors disabled:opacity-50"
                  >
                    {runningSectionIdx === idx ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        Run Snippet
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 font-mono text-xs text-emerald-300 leading-relaxed whitespace-pre overflow-x-auto">
                  {sec.codeExample}
                </div>

                {/* Live execution output if executed */}
                {sectionOutputs[idx] && (
                  <div className="p-3 bg-slate-900/90 border-t border-slate-800 font-mono text-xs text-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold font-sans">
                      Output:
                    </span>
                    <pre className="mt-1 whitespace-pre-wrap">{sectionOutputs[idx]}</pre>
                  </div>
                )}
              </div>
            )}

            {sec.tip && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-semibold text-amber-300">Pro Tip: </span>
                  {sec.tip}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mini Knowledge Quiz */}
      {lesson.quiz && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>Quick Check: Verify Your Understanding</span>
          </div>

          <h3 className="text-base font-bold text-white">
            {lesson.quiz.question}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lesson.quiz.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrect = optIdx === lesson.quiz?.correctIndex;
              let btnClass = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/80';

              if (quizSubmitted) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrect) {
                  btnClass = 'bg-rose-950/40 border-rose-500/50 text-rose-300';
                }
              } else if (isSelected) {
                btnClass = 'bg-slate-800 border-slate-700 text-white';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => {
                    if (!quizSubmitted) setSelectedOption(optIdx);
                  }}
                  className={`p-3.5 rounded-xl border text-left text-xs transition-all ${btnClass}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-mono text-slate-300 shrink-0">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <button
              onClick={() => {
                if (selectedOption !== null) setQuizSubmitted(true);
              }}
              disabled={selectedOption === null}
              className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors disabled:opacity-50"
            >
              Check Answer
            </button>
          ) : (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                {selectedOption === lesson.quiz.correctIndex ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Correct! Outstanding comprehension.
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Not quite right.
                  </span>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed pt-1">
                {lesson.quiz.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Claim XP / Complete Lesson Action */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">
            {isCompleted ? 'Lesson Completed' : 'Ready to claim knowledge rewards?'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {isCompleted
              ? 'You have already collected the XP for this lesson. Keep going!'
              : `Finish this lesson to earn +${lesson.xp} XP toward your next level.`}
          </p>
        </div>

        {!isCompleted ? (
          <button
            onClick={handleCompleteLesson}
            className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-transform hover:scale-105 shadow-md shadow-emerald-500/20 shrink-0"
          >
            Complete Lesson (+{lesson.xp} XP)
          </button>
        ) : (
          <button
            onClick={onBack}
            className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors shrink-0"
          >
            Back to Map
          </button>
        )}
      </div>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-5 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl">
              📖
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Lesson Mastered!
              </span>
              <h2 className="text-xl font-bold text-white mt-1">{lesson.title}</h2>
              <p className="text-xs text-slate-300 mt-2">
                Knowledge added to your grimoire. Test your newfound power in the coding challenges!
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-emerald-400 font-bold">
              +{lesson.xp} XP Earned!
            </div>

            {newBadges.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                <span className="font-bold">Badge Unlocked: </span>
                {newBadges.join(', ')}
              </div>
            )}

            <button
              onClick={() => {
                setShowCelebration(false);
                onBack();
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors"
            >
              Continue Adventure
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
