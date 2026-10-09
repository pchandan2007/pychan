import React from 'react';
import { Sparkles, Code2, Compass, Trophy, X, ArrowRight } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuest: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onStartQuest,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden space-y-6 p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to PyQuest Academy</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 text-left">
          <h2 className="text-2xl font-black text-white tracking-tight">
            Learn Python Like a Game
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            No dry textbooks or dull lectures. Write real Python code right in your browser, solve fun coding challenges, and level up from Novice to Grandmaster.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="space-y-3.5">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="text-xs space-y-0.5">
              <h4 className="font-bold text-white">1. Follow the Quest Map</h4>
              <p className="text-slate-300">
                Explore 6 biomes covering variables, logic, strings, loops, data structures, and functions.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="text-xs space-y-0.5">
              <h4 className="font-bold text-white">2. Solve Real Coding Quests</h4>
              <p className="text-slate-300">
                24 interactive coding puzzles. Write code and hit Run (Ctrl+Enter) to verify against automated test cases.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="text-xs space-y-0.5">
              <h4 className="font-bold text-white">3. Collect XP, Badges & Streaks</h4>
              <p className="text-slate-300">
                Earn XP for every passed quest. Level up your character and unlock rare developer achievements!
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Explore Map First
          </button>
          <button
            onClick={onStartQuest}
            className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-transform hover:scale-[1.02] flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <span>Start First Quest</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
