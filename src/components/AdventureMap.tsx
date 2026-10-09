import React from 'react';
import { UserProfile, Chapter } from '../types';
import { CHAPTERS } from '../data/chapters';
import { CHALLENGES } from '../data/challenges';
import { LESSONS } from '../data/lessons';
import { getRankTitle, getEffectiveStreak } from '../services/storage';
import {
  Compass,
  CheckCircle2,
  Lock,
  Play,
  Sparkles,
  BookOpen,
  Code2,
  Trophy,
  ArrowRight,
  Shield,
  Star,
  Flame,
} from 'lucide-react';

interface AdventureMapProps {
  user: UserProfile;
  onSelectChallenge: (challengeId: string) => void;
  onSelectLesson: (lessonId: string) => void;
  onOpenPlayground: () => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  user,
  onSelectChallenge,
  onSelectLesson,
  onOpenPlayground,
}) => {
  const completedChallengesCount = user.completedChallenges.length;
  const totalChallenges = CHALLENGES.length;
  const progressPercent = Math.round((completedChallengesCount / totalChallenges) * 100);
  const streakStatus = getEffectiveStreak(user);

  // Find the next recommended activity
  const nextIncompleteChallenge = CHALLENGES.find(
    (c) => !user.completedChallenges.includes(c.id)
  );
  const nextIncompleteLesson = LESSONS.find(
    (l) => !user.completedLessons.includes(l.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Hero Progression Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
          <img
            src="/src/assets/images/hero_pyquest_banner_1791578296862.jpg"
            alt="PyQuest Realm"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-0" />

        <div className="relative z-10 p-6 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Compass className="w-4 h-4" />
              <span>World Map · PyQuest Odyssey</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              The Path to Python Mastery
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Embark through 6 mythical biomes from basic syntax in the Whispering Glade to algorithmic mastery atop the Celestial Spire. Write real code, defeat logic puzzles, and claim legendary developer badges!
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200">
                <span className="text-slate-400">Rank:</span>
                <span className="font-semibold text-emerald-300">{getRankTitle(user.level)}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 font-mono">
                <span className="text-slate-400 font-sans">Level:</span>
                <span className="font-bold text-amber-300">{user.level}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200">
                <span className="text-slate-400">Total XP:</span>
                <span className="font-mono font-bold text-emerald-400">{user.xp} XP</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-orange-400 font-mono">
                <Flame className={`w-3.5 h-3.5 ${streakStatus.isActiveToday ? 'fill-orange-400' : 'text-orange-400'}`} />
                <span className="font-bold">{streakStatus.currentStreak}</span>
                <span className="text-slate-400 font-sans text-[11px]">
                  {streakStatus.currentStreak === 1 ? 'day streak' : 'days streak'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Continue Card */}
          <div className="w-full lg:w-80 p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4 shrink-0 shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Overall Completion</span>
              <span className="font-mono font-semibold text-emerald-400">{progressPercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-slate-400 font-mono pt-1">
              <span>{completedChallengesCount} / {totalChallenges} Quests</span>
              <span>{user.completedLessons.length} / {LESSONS.length} Lessons</span>
            </div>

            {nextIncompleteChallenge ? (
              <button
                onClick={() => onSelectChallenge(nextIncompleteChallenge.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-md shadow-emerald-500/20"
              >
                <Play className="w-4 h-4 fill-current" />
                Resume Quest: {nextIncompleteChallenge.title}
              </button>
            ) : (
              <div className="text-center py-2 text-xs text-emerald-400 font-bold flex items-center justify-center gap-2">
                <Trophy className="w-4 h-4" />
                All 24 Challenges Conquered!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chapters / Biome Progression Track */}
      <div className="space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">The 6 Quest Realms</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Complete each chapter's lessons and solve coding puzzles to unlock the next biome.
            </p>
          </div>
          <button
            onClick={onOpenPlayground}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Open Freeform Sandbox <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {CHAPTERS.map((chap, idx) => {
            const chapChallenges = CHALLENGES.filter((c) => c.chapterId === chap.id);
            const chapLessons = LESSONS.filter((l) => l.chapterId === chap.id);
            const completedChapChallenges = chapChallenges.filter((c) =>
              user.completedChallenges.includes(c.id)
            ).length;
            const completedChapLessons = chapLessons.filter((l) =>
              user.completedLessons.includes(l.id)
            ).length;
            const isChapComplete = completedChapChallenges === chapChallenges.length;

            // An unlocked chapter is Chapter 1 or if previous chapter has at least 2 challenges solved
            const prevChap = idx > 0 ? CHAPTERS[idx - 1] : null;
            const prevChapSolved = prevChap
              ? CHALLENGES.filter((c) => c.chapterId === prevChap.id && user.completedChallenges.includes(c.id)).length
              : 999;
            const isUnlocked = idx === 0 || prevChapSolved >= 2;

            return (
              <div
                key={chap.id}
                className={`relative rounded-2xl border transition-all ${
                  isChapComplete
                    ? 'bg-slate-900/60 border-emerald-500/30'
                    : isUnlocked
                    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950/60 border-slate-900 opacity-60'
                }`}
              >
                {/* Chapter Header Banner */}
                <div className="p-6 sm:p-7 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 shadow-md"
                      style={{
                        backgroundColor: isUnlocked ? `${chap.accentColor}20` : '#1e293b',
                        color: isUnlocked ? chap.accentColor : '#64748b',
                        border: `1px solid ${isUnlocked ? `${chap.accentColor}40` : '#334155'}`,
                      }}
                    >
                      {isChapComplete ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <span>0{chap.order}</span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2.5">
                        <span
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: chap.accentColor }}
                        >
                          {chap.biomeName}
                        </span>
                        {isChapComplete && (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Mastered
                          </span>
                        )}
                        {!isUnlocked && (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Locked
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mt-0.5">{chap.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                        {chap.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
                    <div className="text-right">
                      <div className="text-xs font-mono font-semibold text-slate-300">
                        {completedChapChallenges} / {chapChallenges.length} Challenges
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {completedChapLessons} / {chapLessons.length} Lessons
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Node Journey Trail */}
                <div className="p-6 sm:p-7 space-y-6">
                  {/* Lessons Row */}
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Foundational Theory</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {chapLessons.map((lesson) => {
                        const isDone = user.completedLessons.includes(lesson.id);
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => onSelectLesson(lesson.id)}
                            disabled={!isUnlocked}
                            className={`p-3.5 rounded-xl text-left border flex items-center justify-between gap-3 transition-all ${
                              isDone
                                ? 'bg-slate-950/80 border-emerald-500/30 hover:border-emerald-500/60'
                                : isUnlocked
                                ? 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                                : 'bg-slate-950/30 border-slate-900 cursor-not-allowed'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                  isDone
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                  <BookOpen className="w-4 h-4" />
                                )}
                              </div>
                              <div className="truncate">
                                <p className="text-xs font-semibold text-slate-200 truncate">
                                  {lesson.title}
                                </p>
                                <span className="text-[11px] text-slate-400 font-mono">
                                  +{lesson.xp} XP · ~{lesson.estimatedMinutes}m
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-slate-400 shrink-0">
                              {isDone ? 'Review' : 'Learn'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Coding Challenges Row */}
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Real Python Coding Challenges</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {chapChallenges.map((challenge, cIdx) => {
                        const isDone = user.completedChallenges.includes(challenge.id);
                        return (
                          <button
                            key={challenge.id}
                            onClick={() => onSelectChallenge(challenge.id)}
                            disabled={!isUnlocked}
                            className={`p-3.5 rounded-xl text-left border flex flex-col justify-between gap-3 transition-all ${
                              isDone
                                ? 'bg-slate-950/80 border-emerald-500/40 hover:border-emerald-500/70 shadow-sm'
                                : isUnlocked
                                ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 group'
                                : 'bg-slate-950/30 border-slate-900 cursor-not-allowed'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold text-slate-400">
                                Quest 0{cIdx + 1}
                              </span>
                              <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                                <Sparkles className="w-3 h-3" />
                                +{challenge.xp} XP
                              </div>
                            </div>

                            <div>
                              <p className="text-xs font-bold text-white line-clamp-1">
                                {challenge.title}
                              </p>
                              <span className="text-[11px] text-slate-400 capitalize">
                                {challenge.difficulty}
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-1 border-t border-slate-900/80 text-xs">
                              {isDone ? (
                                <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                                </span>
                              ) : (
                                <span className="text-slate-400 group-hover:text-emerald-400 transition-colors flex items-center gap-1 text-[11px]">
                                  <Play className="w-3 h-3 fill-current" /> Code Now
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
