import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Challenge, TestCase, UserProfile } from '../types';
import { CodeEditor } from './CodeEditor';
import { testChallengeCode, runPythonCode } from '../services/pythonRunner';
import { recordChallengeComplete, recordCodeRunEvent } from '../services/storage';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Play,
  CheckCircle2,
  XCircle,
  Terminal,
  Trophy,
  ArrowRight,
  ShieldAlert,
  Loader2,
  Lightbulb,
  Eye,
  RotateCcw,
} from 'lucide-react';

interface ChallengeViewProps {
  challenge: Challenge;
  user: UserProfile;
  onBack: () => void;
  onNextChallenge?: () => void;
  onPreviousChallenge?: () => void;
  onUserUpdate: () => void;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({
  challenge,
  user,
  onBack,
  onNextChallenge,
  onPreviousChallenge,
  onUserUpdate,
}) => {
  // Initialize code from saved user progress if exists, else starter code
  const initialCode = user.savedCode[challenge.id] || challenge.starterCode;
  const [code, setCode] = useState<string>(initialCode);

  // Synchronize when challenge changes
  useEffect(() => {
    setCode(user.savedCode[challenge.id] || challenge.starterCode);
    setTestResults(null);
    setExecutionOutput(null);
    setShowSuccessModal(false);
    setActiveTabMobile('code');
    setRevealedHints([]);
  }, [challenge.id]);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<TestCase[] | null>(null);
  const [executionOutput, setExecutionOutput] = useState<{
    stdout: string;
    stderr: string;
    error?: string;
    timeMs: number;
    allPassed: boolean;
  } | null>(null);

  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [activeTabMobile, setActiveTabMobile] = useState<'instructions' | 'code' | 'results'>('code');

  const isAlreadySolved = user.completedChallenges.includes(challenge.id);

  const handleRunAndTest = async () => {
    setIsRunning(true);
    recordCodeRunEvent();

    try {
      const result = await testChallengeCode(code, challenge);

      setTestResults(result.testResults);
      setExecutionOutput({
        stdout: result.stdout,
        stderr: result.stderr,
        error: result.error,
        timeMs: result.executionTimeMs,
        allPassed: result.allPassed,
      });

      if (result.allPassed) {
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10B981', '#3B82F6', '#F59E0B', '#EC4899'],
          });
        } catch (e) {
          // ignore if canvas blocked
        }

        const { newlyUnlocked } = recordChallengeComplete(challenge.id, challenge.xp, code);
        setNewBadges(newlyUnlocked);
        setShowSuccessModal(true);
        onUserUpdate();
      } else {
        setActiveTabMobile('results');
      }
    } catch (err: any) {
      setExecutionOutput({
        stdout: '',
        stderr: '',
        error: err?.message || 'Execution failed',
        timeMs: 0,
        allPassed: false,
      });
      setActiveTabMobile('results');
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (confirm('Reset code back to the starting template?')) {
      setCode(challenge.starterCode);
    }
  };

  const toggleHint = (idx: number) => {
    if (revealedHints.includes(idx)) {
      setRevealedHints(revealedHints.filter((i) => i !== idx));
    } else {
      setRevealedHints([...revealedHints, idx]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Header & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Return to Quest Map"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400">
                Quest #{challenge.id.replace('ch-', '')}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400 capitalize">{challenge.difficulty}</span>
              {isAlreadySolved && (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                  </span>
                </>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {challenge.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+{challenge.xp} XP</span>
          </div>

          <div className="flex items-center gap-1">
            {onPreviousChallenge && (
              <button
                onClick={onPreviousChallenge}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Previous Challenge"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {onNextChallenge && (
              <button
                onClick={onNextChallenge}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Next Challenge"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex items-center rounded-xl bg-slate-900 p-1 text-xs font-medium border border-slate-800">
        <button
          onClick={() => setActiveTabMobile('instructions')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            activeTabMobile === 'instructions'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Instructions & Hints
        </button>
        <button
          onClick={() => setActiveTabMobile('code')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            activeTabMobile === 'code'
              ? 'bg-slate-800 text-emerald-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Code Editor
        </button>
        <button
          onClick={() => setActiveTabMobile('results')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            activeTabMobile === 'results'
              ? 'bg-slate-800 text-amber-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Test Output
        </button>
      </div>

      {/* Main Two-Column Split Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Story, Instructions & Hints */}
        <div
          className={`lg:col-span-5 space-y-5 ${
            activeTabMobile === 'instructions' ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Story Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <span>Quest Lore</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "{challenge.story}"
            </p>
          </div>

          {/* Instructions Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Objective & Specification
            </h3>
            <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line space-y-2">
              {challenge.instructions}
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-emerald-300 space-y-1">
              <span className="text-slate-400 text-[11px] block">Target Function:</span>
              <span>def {challenge.entryFunctionName}(...)</span>
            </div>
          </div>

          {/* Test Cases Preview */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Sample Test Cases
            </h3>
            <div className="space-y-2">
              {challenge.testCases.map((tc, idx) => (
                <div
                  key={tc.id}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono space-y-1"
                >
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Case 0{idx + 1}: {tc.description}</span>
                    {tc.hidden && <span className="text-slate-400 text-[10px]">(hidden edge case)</span>}
                  </div>
                  <div className="text-slate-300 truncate">
                    <span className="text-slate-400">Input: </span>
                    {challenge.entryFunctionName}({tc.input})
                  </div>
                  <div className="text-emerald-400 truncate">
                    <span className="text-slate-400">Expected: </span>
                    {JSON.stringify(tc.expected)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hints Accordion */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Hints & Guidance</span>
              </div>
              <span className="text-[11px] text-slate-400">{challenge.hints.length} hints available</span>
            </div>

            <div className="space-y-2">
              {challenge.hints.map((hint, idx) => {
                const isRevealed = revealedHints.includes(idx);
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleHint(idx)}
                      className="w-full p-2.5 text-left text-xs font-medium text-slate-300 hover:text-white flex items-center justify-between"
                    >
                      <span>Hint #{idx + 1}</span>
                      <span className="text-[11px] text-emerald-400">
                        {isRevealed ? 'Hide' : 'Reveal'}
                      </span>
                    </button>
                    {isRevealed && (
                      <div className="p-3 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-900 mt-1">
                        {hint}
                      </div>
                    )}
                  </div>
                );
              })}

              {challenge.solutionSnippet && (
                <div className="pt-2">
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showSolution ? 'Hide Reference Solution' : 'View Reference Solution'}</span>
                  </button>
                  {showSolution && (
                    <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-amber-500/20 text-xs font-mono text-amber-300/90 whitespace-pre overflow-x-auto">
                      {challenge.solutionSnippet}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Results */}
        <div
          className={`lg:col-span-7 space-y-5 ${
            activeTabMobile === 'instructions' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Editor Container */}
          <div className={activeTabMobile === 'results' ? 'hidden lg:block' : 'block'}>
            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={handleRunAndTest}
              isRunning={isRunning}
              onReset={handleReset}
              minHeight="360px"
            />
          </div>

          {/* Test Results & Output Console */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-lg space-y-0">
            {/* Console Header */}
            <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Test Suite & Output Console</span>
              </div>

              {executionOutput && (
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-400">{executionOutput.timeMs}ms</span>
                  {executionOutput.allPassed ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> All Tests Passed
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Tests Incomplete
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Test Cases Checklist */}
            <div className="p-4 space-y-3">
              {!testResults && !executionOutput ? (
                <div className="py-8 text-center text-xs text-slate-400 space-y-2">
                  <Terminal className="w-8 h-8 mx-auto text-slate-600 stroke-[1.5]" />
                  <p>Click "Run (Ctrl+Enter)" above to execute your Python code against the test suite.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {testResults?.map((test, idx) => {
                    return (
                      <div
                        key={test.id}
                        className={`p-3 rounded-xl border text-xs font-mono transition-colors ${
                          test.passed
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                            : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                        }`}
                      >
                        <div className="flex items-center justify-between font-sans mb-1">
                          <span className="font-semibold flex items-center gap-1.5">
                            {test.passed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                            Test #{idx + 1}: {test.description}
                          </span>
                          <span className="text-[11px] font-mono">
                            {test.passed ? 'PASSED' : 'FAILED'}
                          </span>
                        </div>

                        <div className="text-[11px] space-y-0.5 pt-1 pl-5 text-slate-300">
                          <div>
                            <span className="text-slate-400">Input: </span>
                            {challenge.entryFunctionName}({test.input})
                          </div>
                          <div>
                            <span className="text-slate-400">Expected: </span>
                            {JSON.stringify(test.expected)}
                          </div>
                          {!test.passed && (
                            <div>
                              <span className="text-rose-400">Actual: </span>
                              {test.error ? (
                                <span className="text-rose-400 font-sans">{test.error}</span>
                              ) : (
                                JSON.stringify(test.actual)
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Standard Output / Stderr Display */}
                  {(executionOutput?.stdout || executionOutput?.stderr || executionOutput?.error) && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                      <div className="text-[10px] uppercase text-slate-400 font-sans font-bold">
                        Standard Output (stdout):
                      </div>
                      {executionOutput?.stdout && (
                        <pre className="text-slate-300 whitespace-pre-wrap">
                          {executionOutput.stdout}
                        </pre>
                      )}
                      {executionOutput?.stderr && (
                        <pre className="text-amber-400 whitespace-pre-wrap">
                          {executionOutput.stderr}
                        </pre>
                      )}
                      {executionOutput?.error && (
                        <pre className="text-rose-400 whitespace-pre-wrap font-sans">
                          {executionOutput.error}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Celebration Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-5 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20">
              🎉
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Quest Conquered!
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                {challenge.title}
              </h2>
              <p className="text-xs text-slate-300 mt-2">
                All test assertions passed with flying colors! Your Python mastery grows stronger.
              </p>
            </div>

            {/* XP Awarded */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-around font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">XP Awarded</span>
                <span className="text-lg font-bold text-emerald-400">+{challenge.xp} XP</span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Current Level</span>
                <span className="text-lg font-bold text-amber-400">LVL {user.level}</span>
              </div>
            </div>

            {/* Newly Unlocked Badges */}
            {newBadges.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
                <div className="font-bold flex items-center justify-center gap-1">
                  <Trophy className="w-4 h-4" />
                  <span>Achievement Unlocked!</span>
                </div>
                <div className="text-[11px] font-semibold">
                  {newBadges.join(', ')}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Review Code
              </button>
              {onNextChallenge ? (
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    onNextChallenge();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-transform hover:scale-[1.02] flex items-center justify-center gap-1.5"
                >
                  <span>Next Quest</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onBack}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-transform hover:scale-[1.02]"
                >
                  Return to Map
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
