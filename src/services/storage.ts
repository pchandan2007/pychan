import { UserProfile } from '../types';
import { BADGES } from '../data/badges';
import { CHAPTERS } from '../data/chapters';

const STORAGE_KEY_USERS = 'pyquest_accounts_v1';
const STORAGE_KEY_ACTIVE_USER = 'pyquest_active_user_id_v1';

export const AVATAR_OPTIONS = [
  { id: 'avatar_mage', name: 'Cyber Mage', url: '/src/assets/images/avatar_cyber_mage_1791578309435.jpg' },
  { id: 'avatar_ranger', name: 'Pixel Ranger', url: '/src/assets/images/avatar_pixel_ranger_1791578321316.jpg' },
  { id: 'avatar_snake', name: 'Py Knight', emoji: '🐍' },
  { id: 'avatar_wizard', name: 'Archmage', emoji: '🧙‍♂️' },
  { id: 'avatar_bot', name: 'Robo Apprentice', emoji: '🤖' },
  { id: 'avatar_fox', name: 'Logic Fox', emoji: '🦊' },
];

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 200) + 1;
}

export function getRankTitle(level: number): string {
  if (level >= 10) return 'Grandmaster Python Wyrm';
  if (level >= 8) return 'Celestial Archmage';
  if (level >= 6) return 'Function Alchemist';
  if (level >= 4) return 'Loop Vanguard';
  if (level >= 3) return 'Logic Scribe';
  if (level >= 2) return 'Syntax Apprentice';
  return 'Novice Adventurer';
}

export function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Calculates calendar day difference between two 'YYYY-MM-DD' strings.
 */
export function getDaysDifference(dateStr1: string, dateStr2: string): number {
  if (!dateStr1 || !dateStr2) return 999;
  const [y1, m1, d1] = dateStr1.split('-').map(Number);
  const [y2, m2, d2] = dateStr2.split('-').map(Number);
  const t1 = new Date(y1, m1 - 1, d1).getTime();
  const t2 = new Date(y2, m2 - 1, d2).getTime();
  return Math.round(Math.abs(t2 - t1) / (1000 * 60 * 60 * 24));
}

export interface StreakStatus {
  currentStreak: number;
  longestStreak: number;
  isActiveToday: boolean;
  isAtRisk: boolean;
  message: string;
}

/**
 * Returns the effective live streak status for display in UI.
 */
export function getEffectiveStreak(user: UserProfile): StreakStatus {
  const today = getTodayString();
  const yesterday = getYesterdayString();
  const lastActive = user.lastActiveDate;
  const longest = user.longestStreak || user.streak || 1;

  if (lastActive === today) {
    return {
      currentStreak: user.streak,
      longestStreak: longest,
      isActiveToday: true,
      isAtRisk: false,
      message: `Streak active! You've coded today. 🔥`,
    };
  }

  if (lastActive === yesterday) {
    return {
      currentStreak: user.streak,
      longestStreak: longest,
      isActiveToday: false,
      isAtRisk: true,
      message: `Streak at risk! Code today to extend your ${user.streak}-day streak! ⏳`,
    };
  }

  // More than 1 day missed: streak has reset to 0 until activity completed today
  return {
    currentStreak: 0,
    longestStreak: longest,
    isActiveToday: false,
    isAtRisk: false,
    message: `Start a new streak! Code today to earn Day 1. ⚡`,
  };
}

export interface DayStatus {
  dateStr: string;
  dayLabel: string;
  isActive: boolean;
  isToday: boolean;
}

/**
 * Returns activity status for the past 7 days (including today).
 */
export function getPast7DaysStatus(activeDates: string[] = []): DayStatus[] {
  const todayStr = getTodayString();
  const dateSet = new Set(activeDates);
  const days: DayStatus[] = [];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const dayLabel = dayLabels[d.getDay()];

    days.push({
      dateStr,
      dayLabel,
      isActive: dateSet.has(dateStr),
      isToday: dateStr === todayStr,
    });
  }

  return days;
}

/**
 * Pure function to calculate updated streak state on any user activity.
 */
function applyActivityToStreak(prev: UserProfile): {
  streak: number;
  longestStreak: number;
  lastActiveDate: string;
  activeDates: string[];
} {
  const today = getTodayString();
  const yesterday = getYesterdayString();
  const existingActiveDates = new Set(prev.activeDates || [prev.lastActiveDate]);
  existingActiveDates.add(today);

  let newStreak = prev.streak;

  if (prev.lastActiveDate === today) {
    // Already active today; retain existing streak
    newStreak = Math.max(1, prev.streak);
  } else if (prev.lastActiveDate === yesterday) {
    // Consecutive day!
    newStreak = prev.streak + 1;
  } else {
    // First time or missed 1+ days: reset streak to 1
    newStreak = 1;
  }

  const newLongest = Math.max(prev.longestStreak || 1, newStreak);

  return {
    streak: newStreak,
    longestStreak: newLongest,
    lastActiveDate: today,
    activeDates: Array.from(existingActiveDates),
  };
}

const DEFAULT_GUEST: UserProfile = {
  id: 'guest_user',
  username: 'adventurer',
  name: 'Novice Adventurer',
  avatar: '/src/assets/images/avatar_cyber_mage_1791578309435.jpg',
  createdAt: Date.now(),
  xp: 0,
  level: 1,
  streak: 1,
  longestStreak: 1,
  lastActiveDate: getTodayString(),
  activeDates: [getTodayString()],
  completedLessons: [],
  completedChallenges: [],
  savedCode: {},
  unlockedBadges: [],
  totalCodeRuns: 0,
};

function normalizeUser(u: any): UserProfile {
  return {
    ...u,
    streak: typeof u.streak === 'number' ? u.streak : 1,
    longestStreak: typeof u.longestStreak === 'number' ? u.longestStreak : (u.streak || 1),
    activeDates: Array.isArray(u.activeDates) && u.activeDates.length > 0 ? u.activeDates : [u.lastActiveDate || getTodayString()],
    lastActiveDate: u.lastActiveDate || getTodayString(),
  };
}

export function getAllUsers(): UserProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    if (!raw) {
      saveAllUsers([DEFAULT_GUEST]);
      return [DEFAULT_GUEST];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(normalizeUser);
    }
    return [DEFAULT_GUEST];
  } catch (e) {
    return [DEFAULT_GUEST];
  }
}

export function saveAllUsers(users: UserProfile[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users:', e);
  }
}

export function getActiveUserId(): string {
  try {
    const id = localStorage.getItem(STORAGE_KEY_ACTIVE_USER);
    if (id) return id;
    const users = getAllUsers();
    const defaultId = users[0]?.id || DEFAULT_GUEST.id;
    localStorage.setItem(STORAGE_KEY_ACTIVE_USER, defaultId);
    return defaultId;
  } catch (e) {
    return DEFAULT_GUEST.id;
  }
}

export function setActiveUserId(userId: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVE_USER, userId);
  } catch (e) {
    console.error('Failed to set active user ID:', e);
  }
}

export function getActiveUser(): UserProfile {
  const activeId = getActiveUserId();
  const users = getAllUsers();
  const found = users.find((u) => u.id === activeId);
  if (found) return found;
  if (users.length > 0) return users[0];
  return DEFAULT_GUEST;
}

export function updateActiveUser(updater: (prev: UserProfile) => UserProfile): UserProfile {
  const users = getAllUsers();
  const activeId = getActiveUserId();
  let updatedActive: UserProfile = DEFAULT_GUEST;

  const newUsers = users.map((u) => {
    if (u.id === activeId) {
      const updated = updater(u);
      updated.level = calculateLevel(updated.xp);
      updatedActive = updated;
      return updated;
    }
    return u;
  });

  saveAllUsers(newUsers);
  return updatedActive;
}

export function createUser(name: string, username: string, avatar: string): UserProfile {
  const users = getAllUsers();
  const cleanUsername = username.trim().toLowerCase();
  
  // check if username exists
  const existing = users.find((u) => u.username.toLowerCase() === cleanUsername);
  if (existing) {
    setActiveUserId(existing.id);
    return existing;
  }

  const today = getTodayString();
  const newUser: UserProfile = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    username: cleanUsername,
    name: name.trim() || 'Python Adventurer',
    avatar: avatar || '/src/assets/images/avatar_cyber_mage_1791578309435.jpg',
    createdAt: Date.now(),
    xp: 0,
    level: 1,
    streak: 1,
    longestStreak: 1,
    lastActiveDate: today,
    activeDates: [today],
    completedLessons: [],
    completedChallenges: [],
    savedCode: {},
    unlockedBadges: [],
    totalCodeRuns: 0,
  };

  users.push(newUser);
  saveAllUsers(users);
  setActiveUserId(newUser.id);
  return newUser;
}

/**
 * Check badge triggers and return newly unlocked badge titles
 */
export function evaluateBadges(user: UserProfile): { user: UserProfile; newlyUnlocked: string[] } {
  const unlocked = new Set(user.unlockedBadges);
  const newlyUnlocked: string[] = [];

  const grant = (badgeId: string) => {
    if (!unlocked.has(badgeId)) {
      unlocked.add(badgeId);
      const b = BADGES.find((x) => x.id === badgeId);
      if (b) newlyUnlocked.push(b.title);
    }
  };

  // 1. first_run
  if (user.totalCodeRuns > 0) grant('first_run');

  // 2. first_blood
  if (user.completedChallenges.length >= 1) grant('first_blood');

  // 3. Chapter masteries
  const chap1 = CHAPTERS.find((c) => c.id === 'chap-1');
  if (chap1 && chap1.challenges.every((cid) => user.completedChallenges.includes(cid))) grant('syntax_scout');

  const chap2 = CHAPTERS.find((c) => c.id === 'chap-2');
  if (chap2 && chap2.challenges.every((cid) => user.completedChallenges.includes(cid))) grant('logic_adept');

  const chap3 = CHAPTERS.find((c) => c.id === 'chap-3');
  if (chap3 && chap3.challenges.every((cid) => user.completedChallenges.includes(cid))) grant('rune_cutter');

  const chap4 = CHAPTERS.find((c) => c.id === 'chap-4');
  if (chap4 && chap4.challenges.every((cid) => user.completedChallenges.includes(cid))) grant('clockwork_titan');

  const chap5 = CHAPTERS.find((c) => c.id === 'chap-5');
  if (chap5 && chap5.challenges.every((cid) => user.completedChallenges.includes(cid))) grant('forge_master');

  const chap6 = CHAPTERS.find((c) => c.id === 'chap-6');
  if (chap6 && chap6.challenges.every((cid) => user.completedChallenges.includes(cid))) grant('spire_champion');

  // 4. scholar_apprentice (6 lessons)
  if (user.completedLessons.length >= 6) grant('scholar_apprentice');

  // 5. streak_3
  if (user.streak >= 3) grant('streak_3');

  // 6. xp milestones
  if (user.xp >= 500) grant('xp_500');
  if (user.xp >= 1500) grant('xp_1500');

  const updatedUser: UserProfile = {
    ...user,
    unlockedBadges: Array.from(unlocked),
  };

  return { user: updatedUser, newlyUnlocked };
}

export function recordChallengeComplete(
  challengeId: string,
  xpEarned: number,
  userCode: string
): { user: UserProfile; newlyUnlocked: string[]; isFirstTime: boolean } {
  let isFirstTime = false;

  const updated = updateActiveUser((prev) => {
    const alreadyCompleted = prev.completedChallenges.includes(challengeId);
    isFirstTime = !alreadyCompleted;
    const streakInfo = applyActivityToStreak(prev);

    const completed = alreadyCompleted
      ? prev.completedChallenges
      : [...prev.completedChallenges, challengeId];

    // Only grant XP on first completion
    const newXp = alreadyCompleted ? prev.xp : prev.xp + xpEarned;

    const baseUpdated: UserProfile = {
      ...prev,
      xp: newXp,
      streak: streakInfo.streak,
      longestStreak: streakInfo.longestStreak,
      lastActiveDate: streakInfo.lastActiveDate,
      activeDates: streakInfo.activeDates,
      completedChallenges: completed,
      savedCode: {
        ...prev.savedCode,
        [challengeId]: userCode,
      },
    };

    return baseUpdated;
  });

  const { user: finalUser, newlyUnlocked } = evaluateBadges(updated);
  if (newlyUnlocked.length > 0) {
    updateActiveUser(() => finalUser);
  }

  return { user: finalUser, newlyUnlocked, isFirstTime };
}

export function recordLessonComplete(
  lessonId: string,
  xpEarned: number
): { user: UserProfile; newlyUnlocked: string[]; isFirstTime: boolean } {
  let isFirstTime = false;

  const updated = updateActiveUser((prev) => {
    const alreadyCompleted = prev.completedLessons.includes(lessonId);
    isFirstTime = !alreadyCompleted;
    const streakInfo = applyActivityToStreak(prev);

    const completed = alreadyCompleted
      ? prev.completedLessons
      : [...prev.completedLessons, lessonId];

    const newXp = alreadyCompleted ? prev.xp : prev.xp + xpEarned;

    return {
      ...prev,
      xp: newXp,
      streak: streakInfo.streak,
      longestStreak: streakInfo.longestStreak,
      lastActiveDate: streakInfo.lastActiveDate,
      activeDates: streakInfo.activeDates,
      completedLessons: completed,
    };
  });

  const { user: finalUser, newlyUnlocked } = evaluateBadges(updated);
  if (newlyUnlocked.length > 0) {
    updateActiveUser(() => finalUser);
  }

  return { user: finalUser, newlyUnlocked, isFirstTime };
}

export function recordCodeRunEvent(): void {
  const updated = updateActiveUser((prev) => {
    const streakInfo = applyActivityToStreak(prev);
    return {
      ...prev,
      totalCodeRuns: prev.totalCodeRuns + 1,
      streak: streakInfo.streak,
      longestStreak: streakInfo.longestStreak,
      lastActiveDate: streakInfo.lastActiveDate,
      activeDates: streakInfo.activeDates,
    };
  });

  const { user: finalUser } = evaluateBadges(updated);
  updateActiveUser(() => finalUser);
}
