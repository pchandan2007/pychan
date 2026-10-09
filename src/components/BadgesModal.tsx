import React from 'react';
import { BADGES } from '../data/badges';
import { UserProfile } from '../types';
import {
  X,
  Trophy,
  CheckCircle2,
  Lock,
  Sparkles,
  Award,
  Terminal,
  Sword,
  Compass,
  GitFork,
  Cog,
  Boxes,
  Crown,
  BookOpen,
  Flame,
  Shield,
} from 'lucide-react';

interface BadgesModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-5 h-5" />,
  Sword: <Sword className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  GitFork: <GitFork className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Cog: <Cog className="w-5 h-5" />,
  Boxes: <Boxes className="w-5 h-5" />,
  Crown: <Crown className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
};

export const BadgesModal: React.FC<BadgesModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;

  const unlockedCount = user.unlockedBadges.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Trophies & Badges</h2>
              <p className="text-xs text-slate-400">
                {unlockedCount} of {BADGES.length} Badges Claimed
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {BADGES.map((badge) => {
              const isUnlocked = user.unlockedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                    isUnlocked
                      ? 'bg-slate-950/90 border-amber-500/30 shadow-sm shadow-amber-950/20'
                      : 'bg-slate-950/40 border-slate-800/80 opacity-60'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isUnlocked
                        ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                        : 'bg-slate-900 border border-slate-800 text-slate-600'
                    }`}
                  >
                    {isUnlocked ? ICON_MAP[badge.icon] || <Award className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white truncate">{badge.title}</h4>
                      {isUnlocked && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      {badge.description}
                    </p>
                    <div className="text-[10px] text-slate-400 pt-0.5">
                      Requirement: {badge.requirement}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
