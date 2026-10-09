import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  getAllUsers,
  setActiveUserId,
  createUser,
  updateActiveUser,
  AVATAR_OPTIONS,
  getRankTitle,
  getEffectiveStreak,
  getPast7DaysStatus,
} from '../services/storage';
import {
  X,
  User,
  UserPlus,
  LogOut,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Trophy,
  Flame,
  Check,
  Shield,
  Calendar,
} from 'lucide-react';

interface UserAccountModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdate: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  user,
  isOpen,
  onClose,
  onUserUpdate,
}) => {
  const [mode, setMode] = useState<'profile' | 'create' | 'switch'>('profile');

  // New user form state
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0].url || AVATAR_OPTIONS[0].id);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const allUsers = getAllUsers();
  const streakStatus = getEffectiveStreak(user);
  const past7Days = getPast7DaysStatus(user.activeDates);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!newUsername.trim()) {
      setErrorMessage('Please enter a username.');
      return;
    }

    try {
      createUser(newName || 'Adventurer', newUsername, selectedAvatar);
      onUserUpdate();
      setMode('profile');
      setNewName('');
      setNewUsername('');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Could not create account');
    }
  };

  const handleSwitchUser = (userId: string) => {
    setActiveUserId(userId);
    onUserUpdate();
    setMode('profile');
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `pyquest_${user.username}_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.username) {
          updateActiveUser(() => parsed);
          onUserUpdate();
          alert('Progress restored successfully!');
        } else {
          alert('Invalid PyQuest backup file format.');
        }
      } catch (err) {
        alert('Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset your XP, level, and solved challenges to 0?')) {
      updateActiveUser((prev) => ({
        ...prev,
        xp: 0,
        level: 1,
        completedChallenges: [],
        completedLessons: [],
        unlockedBadges: [],
        savedCode: {},
        totalCodeRuns: 0,
      }));
      onUserUpdate();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                mode === 'profile'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Profile & Stats
            </button>
            <button
              onClick={() => setMode('switch')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                mode === 'switch'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Switch Account ({allUsers.length})
            </button>
            <button
              onClick={() => setMode('create')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                mode === 'create'
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              New User
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {mode === 'profile' && (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center gap-4">
                {user.avatar.startsWith('/') ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/40 shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl shrink-0">
                    {user.avatar}
                  </div>
                )}

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white truncate">{user.name}</h3>
                    <span className="text-[11px] text-slate-400 font-mono">@{user.username}</span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-400">{getRankTitle(user.level)}</p>
                  <p className="text-[11px] text-slate-400">
                    Adventurer since {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Level</div>
                  <div className="text-lg font-bold font-mono text-amber-400">LVL {user.level}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Total XP</div>
                  <div className="text-lg font-bold font-mono text-emerald-400">{user.xp}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Quests Done</div>
                  <div className="text-lg font-bold font-mono text-blue-400">{user.completedChallenges.length}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Streak</div>
                  <div className="text-lg font-bold font-mono text-orange-400">
                    {streakStatus.currentStreak} {streakStatus.currentStreak === 1 ? 'Day' : 'Days'}
                  </div>
                </div>
              </div>

              {/* Daily Streak & Activity Tracker Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                      <Flame className="w-4 h-4 fill-orange-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Daily Streak Counter
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Tracks consecutive days of coding activity
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        streakStatus.isActiveToday
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : streakStatus.isAtRisk
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {streakStatus.isActiveToday
                        ? 'Active Today'
                        : streakStatus.isAtRisk
                        ? 'At Risk'
                        : 'Inactive'}
                    </span>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Longest: {streakStatus.longestStreak} days
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
                  <span>{streakStatus.message}</span>
                  <span className="font-mono font-bold text-orange-400 shrink-0 ml-2">
                    {streakStatus.currentStreak} 🔥
                  </span>
                </div>

                {/* 7-Day Activity Calendar Strip */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5" /> Recent 7 Days
                    </span>
                    <span className="font-mono text-[10px]">
                      {past7Days.filter((d) => d.isActive).length} of 7 days completed
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5">
                    {past7Days.map((day) => (
                      <div
                        key={day.dateStr}
                        className={`p-2 rounded-lg flex flex-col items-center justify-center gap-1 border transition-all ${
                          day.isActive
                            ? 'bg-orange-500/15 border-orange-500/30 text-orange-300'
                            : day.isToday
                            ? 'bg-slate-900 border-slate-700 text-slate-400'
                            : 'bg-slate-900/40 border-slate-800 text-slate-600'
                        }`}
                      >
                        <span className="text-[10px] font-semibold">{day.dayLabel}</span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                            day.isActive
                              ? 'bg-orange-500 text-slate-950 font-bold'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {day.isActive ? <Check className="w-3 h-3 stroke-[3]" /> : '·'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data & Backup Tools */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Data Persistence & Backups
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleExportData}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export Progress (JSON)
                  </button>

                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    Import Backup
                    <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                  </label>

                  <button
                    onClick={handleResetProgress}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/30 hover:bg-rose-900/50 border border-rose-500/30 text-xs text-rose-300 transition-colors ml-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Progress
                  </button>
                </div>
              </div>
            </div>
          )}

          {mode === 'switch' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Active Account Profile
              </h3>
              <div className="space-y-2">
                {allUsers.map((u) => {
                  const isActive = u.id === user.id;
                  return (
                    <button
                      key={u.id}
                      onClick={() => handleSwitchUser(u.id)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-colors ${
                        isActive
                          ? 'bg-slate-800 border-emerald-500/40'
                          : 'bg-slate-950 border-slate-800 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {u.avatar.startsWith('/') ? (
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-emerald-500/30"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm">
                            {u.avatar}
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold text-white">{u.name}</p>
                          <span className="text-[11px] text-slate-400 font-mono">
                            @{u.username} · {u.xp} XP · Level {u.level}
                          </span>
                        </div>
                      </div>

                      {isActive && (
                        <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Active
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {mode === 'create' && (
            <form onSubmit={handleCreateUser} className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Create New User Profile</h3>
                <p className="text-xs text-slate-400">
                  Track individual progress, XP, and solved coding challenges separately.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Aria the Sorceress"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Username (Unique identifier)
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="e.g. aria_coder"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Choose Character Avatar
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {AVATAR_OPTIONS.map((opt) => {
                      const value = opt.url || opt.emoji!;
                      const isSelected = selectedAvatar === value;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedAvatar(value)}
                          className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                            isSelected
                              ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500'
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {opt.url ? (
                            <img
                              src={opt.url}
                              alt={opt.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          ) : (
                            <span className="text-2xl">{opt.emoji}</span>
                          )}
                          <span className="text-[10px] text-slate-400 font-medium truncate w-full text-center">
                            {opt.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Create Profile & Start Playing
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
