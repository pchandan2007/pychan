import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { getEffectiveStreak, getPast7DaysStatus } from '../services/storage';
import {
  Sparkles,
  Flame,
  User,
  Trophy,
  BookOpen,
  Code2,
  Compass,
  Play,
  Check,
  ChevronRight,
  Zap,
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'map' | 'lessons' | 'challenges' | 'playground' | 'badges';
  setActiveTab: (tab: 'map' | 'lessons' | 'challenges' | 'playground' | 'badges') => void;
  user: UserProfile;
  onOpenProfile: () => void;
  onOpenBadges: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenProfile,
  onOpenBadges,
}) => {
  const [isStreakPopoverOpen, setIsStreakPopoverOpen] = useState(false);
  const streakRef = useRef<HTMLDivElement>(null);

  const streakStatus = getEffectiveStreak(user);
  const past7Days = getPast7DaysStatus(user.activeDates);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (streakRef.current && !streakRef.current.contains(event.target as Node)) {
        setIsStreakPopoverOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => setActiveTab('map')}
          className="flex items-center gap-2.5 text-left group shrink-0 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-black text-lg shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            🐍
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5 leading-none">
              PyQuest
              <span className="text-[10px] tracking-wide uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                Academy
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Gamified Python</p>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'map'
                ? 'bg-slate-800/80 text-emerald-400 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            Quest Map
          </button>

          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'lessons'
                ? 'bg-slate-800/80 text-emerald-400 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Lessons
          </button>

          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'challenges'
                ? 'bg-slate-800/80 text-emerald-400 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Challenges
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'playground'
                ? 'bg-slate-800/80 text-emerald-400 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Play className="w-4 h-4" />
            Sandbox
          </button>

          <button
            onClick={onOpenBadges}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'badges'
                ? 'bg-slate-800/80 text-amber-400 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Trophy className="w-4 h-4" />
            Badges
          </button>
        </nav>

        {/* Zone 3: Gamified Stats & Account Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Interactive Streak Counter */}
          <div className="relative" ref={streakRef}>
            <button
              onClick={() => setIsStreakPopoverOpen(!isStreakPopoverOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                streakStatus.isActiveToday
                  ? 'bg-orange-500/15 border-orange-500/30 text-orange-400 shadow-sm shadow-orange-950/30'
                  : streakStatus.isAtRisk
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-300 animate-pulse'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Click to view your daily activity streak"
            >
              <Flame
                className={`w-4 h-4 ${
                  streakStatus.isActiveToday
                    ? 'fill-orange-400 text-orange-400'
                    : streakStatus.isAtRisk
                    ? 'fill-amber-400/80 text-amber-400'
                    : 'text-slate-500'
                }`}
              />
              <span className="font-mono tabular-nums font-bold">
                {streakStatus.currentStreak}
              </span>
              <span className="hidden sm:inline text-[11px] opacity-80">
                {streakStatus.currentStreak === 1 ? 'day' : 'days'}
              </span>
            </button>

            {/* Streak Popover Menu */}
            {isStreakPopoverOpen && (
              <div className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-2 w-72 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 text-xs space-y-3.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                      <Flame className="w-4 h-4 fill-orange-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">
                        {streakStatus.currentStreak} Day Streak
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Longest: {streakStatus.longestStreak} days
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      streakStatus.isActiveToday
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                        : streakStatus.isAtRisk
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {streakStatus.isActiveToday ? 'Active' : streakStatus.isAtRisk ? 'At Risk' : 'Inactive'}
                  </span>
                </div>

                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {streakStatus.message}
                </p>

                {/* 7-Day Activity Dot Trail */}
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase font-semibold">
                    <span>Past 7 Days</span>
                    <span>{past7Days.filter((d) => d.isActive).length}/7 Active</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1 pt-1">
                    {past7Days.map((day) => (
                      <div key={day.dateStr} className="flex flex-col items-center gap-1">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono transition-colors ${
                            day.isActive
                              ? 'bg-orange-500 text-slate-950 font-bold shadow-sm shadow-orange-500/30'
                              : day.isToday
                              ? 'bg-slate-800 text-slate-400 border border-slate-700'
                              : 'bg-slate-900/80 text-slate-600'
                          }`}
                          title={`${day.dateStr}: ${day.isActive ? 'Active' : 'No activity'}`}
                        >
                          {day.isActive ? <Check className="w-3 h-3 stroke-[2.5]" /> : '·'}
                        </div>
                        <span
                          className={`text-[9px] ${
                            day.isToday ? 'text-orange-400 font-bold' : 'text-slate-400'
                          }`}
                        >
                          {day.dayLabel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsStreakPopoverOpen(false);
                    onOpenProfile();
                  }}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <span>View Full Profile & Streaks</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* XP & Level */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800"
            title={`${user.xp} Total XP - Level ${user.level}`}
          >
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-mono tabular-nums">{user.xp}</span>
              <span className="text-[10px] text-slate-400">XP</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="text-xs font-bold text-amber-400 font-mono">
              LVL {user.level}
            </div>
          </div>

          {/* User Profile Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors focus:outline-none"
          >
            {user.avatar.startsWith('/') ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-emerald-500/40"
              />
            ) : (
              <span className="text-sm">{user.avatar}</span>
            )}
            <span className="text-xs font-semibold max-w-[100px] truncate hidden sm:inline">
              {user.name}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-900 bg-slate-950/95 px-2 py-1.5 text-xs">
        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center py-1 px-2 rounded ${
            activeTab === 'map' ? 'text-emerald-400' : 'text-slate-400'
          }`}
        >
          <Compass className="w-4 h-4 mb-0.5" />
          <span>Map</span>
        </button>
        <button
          onClick={() => setActiveTab('lessons')}
          className={`flex flex-col items-center py-1 px-2 rounded ${
            activeTab === 'lessons' ? 'text-emerald-400' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>Lessons</span>
        </button>
        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex flex-col items-center py-1 px-2 rounded ${
            activeTab === 'challenges' ? 'text-emerald-400' : 'text-slate-400'
          }`}
        >
          <Code2 className="w-4 h-4 mb-0.5" />
          <span>Quests</span>
        </button>
        <button
          onClick={() => setActiveTab('playground')}
          className={`flex flex-col items-center py-1 px-2 rounded ${
            activeTab === 'playground' ? 'text-emerald-400' : 'text-slate-400'
          }`}
        >
          <Play className="w-4 h-4 mb-0.5" />
          <span>Sandbox</span>
        </button>
        <button
          onClick={onOpenBadges}
          className={`flex flex-col items-center py-1 px-2 rounded ${
            activeTab === 'badges' ? 'text-amber-400' : 'text-slate-400'
          }`}
        >
          <Trophy className="w-4 h-4 mb-0.5" />
          <span>Badges</span>
        </button>
      </div>
    </header>
  );
};
