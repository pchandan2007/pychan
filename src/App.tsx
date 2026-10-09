import React, { useState, useEffect } from 'react';
import { UserProfile, Challenge, Lesson } from './types';
import { getActiveUser, updateActiveUser } from './services/storage';
import { CHAPTERS } from './data/chapters';
import { CHALLENGES } from './data/challenges';
import { LESSONS } from './data/lessons';
import { Navbar } from './components/Navbar';
import { AdventureMap } from './components/AdventureMap';
import { ChallengeView } from './components/ChallengeView';
import { LessonView } from './components/LessonView';
import { Playground } from './components/Playground';
import { BadgesModal } from './components/BadgesModal';
import { UserAccountModal } from './components/UserAccountModal';
import { OnboardingModal } from './components/OnboardingModal';
import {
  Code2,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Filter,
  Search,
  HelpCircle,
  Play,
} from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<UserProfile>(getActiveUser());
  const [activeTab, setActiveTab] = useState<'map' | 'lessons' | 'challenges' | 'playground' | 'badges'>('map');
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Modals
  const [isBadgesOpen, setIsBadgesOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    return !localStorage.getItem('pyquest_onboarding_shown');
  });

  // Filter & Search states for Catalog views
  const [challengeFilterDifficulty, setChallengeFilterDifficulty] = useState<string>('all');
  const [challengeSearch, setChallengeSearch] = useState<string>('');

  const refreshUser = () => {
    setUser(getActiveUser());
  };

  const handleOpenChallenge = (challengeId: string) => {
    setActiveChallengeId(challengeId);
    setActiveLessonId(null);
    setActiveTab('challenges');
  };

  const handleOpenLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveChallengeId(null);
    setActiveTab('lessons');
  };

  const handleCloseActiveView = () => {
    setActiveChallengeId(null);
    setActiveLessonId(null);
    setActiveTab('map');
  };

  // Challenge Navigation
  const currentChallengeIndex = CHALLENGES.findIndex((c) => c.id === activeChallengeId);
  const prevChallenge = currentChallengeIndex > 0 ? CHALLENGES[currentChallengeIndex - 1] : null;
  const nextChallenge =
    currentChallengeIndex >= 0 && currentChallengeIndex < CHALLENGES.length - 1
      ? CHALLENGES[currentChallengeIndex + 1]
      : null;

  const handleCloseOnboarding = () => {
    localStorage.setItem('pyquest_onboarding_shown', 'true');
    setIsOnboardingOpen(false);
  };

  const handleStartFirstQuest = () => {
    handleCloseOnboarding();
    handleOpenChallenge('ch-1-1');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'challenges') setActiveChallengeId(null);
          if (tab !== 'lessons') setActiveLessonId(null);
        }}
        user={user}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenBadges={() => setIsBadgesOpen(true)}
      />

      {/* Main Content Arena */}
      <main className="flex-1 pb-16">
        {/* VIEW 1: Active Coding Challenge Arena */}
        {activeChallengeId && (
          <ChallengeView
            challenge={CHALLENGES.find((c) => c.id === activeChallengeId) || CHALLENGES[0]}
            user={user}
            onBack={handleCloseActiveView}
            onNextChallenge={nextChallenge ? () => handleOpenChallenge(nextChallenge.id) : undefined}
            onPreviousChallenge={prevChallenge ? () => handleOpenChallenge(prevChallenge.id) : undefined}
            onUserUpdate={refreshUser}
          />
        )}

        {/* VIEW 2: Active Theory Lesson Arena */}
        {!activeChallengeId && activeLessonId && (
          <LessonView
            lesson={LESSONS.find((l) => l.id === activeLessonId) || LESSONS[0]}
            user={user}
            onBack={handleCloseActiveView}
            onJumpToChallenge={(cid) => handleOpenChallenge(cid)}
            onUserUpdate={refreshUser}
          />
        )}

        {/* VIEW 3: Adventure Quest Map */}
        {!activeChallengeId && !activeLessonId && activeTab === 'map' && (
          <AdventureMap
            user={user}
            onSelectChallenge={handleOpenChallenge}
            onSelectLesson={handleOpenLesson}
            onOpenPlayground={() => setActiveTab('playground')}
          />
        )}

        {/* VIEW 4: Challenges Catalog List */}
        {!activeChallengeId && !activeLessonId && activeTab === 'challenges' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  All 24 Coding Challenges
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Solve coding puzzles with real Python tests. Solved: {user.completedChallenges.length} / {CHALLENGES.length}
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={challengeSearch}
                    onChange={(e) => setChallengeSearch(e.target.value)}
                    placeholder="Search quests..."
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-44"
                  />
                </div>

                <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-medium">
                  {['all', 'Novice', 'Apprentice', 'Adept'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setChallengeFilterDifficulty(diff)}
                      className={`px-3 py-1 rounded-lg transition-colors capitalize ${
                        challengeFilterDifficulty === diff
                          ? 'bg-slate-800 text-emerald-400 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CHALLENGES.filter((c) => {
                const matchesDiff =
                  challengeFilterDifficulty === 'all' || c.difficulty === challengeFilterDifficulty;
                const matchesSearch =
                  !challengeSearch ||
                  c.title.toLowerCase().includes(challengeSearch.toLowerCase()) ||
                  c.instructions.toLowerCase().includes(challengeSearch.toLowerCase());
                return matchesDiff && matchesSearch;
              }).map((ch, idx) => {
                const isDone = user.completedChallenges.includes(ch.id);
                const chapter = CHAPTERS.find((cp) => cp.id === ch.chapterId);

                return (
                  <button
                    key={ch.id}
                    onClick={() => handleOpenChallenge(ch.id)}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between gap-4 transition-all ${
                      isDone
                        ? 'bg-slate-900/60 border-emerald-500/40 hover:border-emerald-500/70'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[11px] font-mono text-slate-400 font-semibold">
                          {chapter?.biomeName || 'Realm'}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                          <Sparkles className="w-3 h-3" />
                          +{ch.xp} XP
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white line-clamp-1">{ch.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 italic">
                        "{ch.story}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                      <span className="text-[11px] text-slate-400 capitalize">
                        {ch.difficulty}
                      </span>

                      {isDone ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                        </span>
                      ) : (
                        <span className="text-slate-300 font-medium flex items-center gap-1 text-[11px]">
                          <Play className="w-3 h-3 fill-current text-emerald-400" /> Solve Quest
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 5: Lessons Catalog List */}
        {!activeChallengeId && !activeLessonId && activeTab === 'lessons' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            <div className="pb-4 border-b border-slate-800">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Python Theory & Foundations
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Structured interactive guides with live code snippet previews and knowledge checks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {LESSONS.map((ls, idx) => {
                const isDone = user.completedLessons.includes(ls.id);
                const chap = CHAPTERS.find((c) => c.id === ls.chapterId);

                return (
                  <button
                    key={ls.id}
                    onClick={() => handleOpenLesson(ls.id)}
                    className={`p-6 rounded-2xl border text-left flex flex-col justify-between gap-4 transition-all ${
                      isDone
                        ? 'bg-slate-900/60 border-emerald-500/40 hover:border-emerald-500/70'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
                          Chapter {chap?.order}: {chap?.biomeName}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                          <Sparkles className="w-3 h-3" />
                          +{ls.xp} XP
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white">{ls.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                        {ls.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                      <span className="text-slate-400 font-mono text-[11px]">
                        ~{ls.estimatedMinutes} minutes · {ls.sections.length} sections
                      </span>

                      {isDone ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                          Start Lesson <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 6: Freeform Playground Sandbox */}
        {!activeChallengeId && !activeLessonId && activeTab === 'playground' && (
          <Playground />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">PyQuest Academy</span>
            <span>·</span>
            <span>Client-side WebAssembly CPython (Pyodide)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" /> Beginner Guide
            </button>
            <button
              onClick={() => setIsBadgesOpen(true)}
              className="hover:text-emerald-400 transition-colors"
            >
              Badges
            </button>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="hover:text-emerald-400 transition-colors"
            >
              Saved Progress
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BadgesModal
        user={user}
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
      />

      <UserAccountModal
        user={user}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onUserUpdate={refreshUser}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleCloseOnboarding}
        onStartQuest={handleStartFirstQuest}
      />
    </div>
  );
}
