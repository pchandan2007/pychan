export type Difficulty = 'Novice' | 'Apprentice' | 'Adept';

export interface TestCase {
  id: string;
  description: string;
  input: string; // Representation of args or stdin
  expected: any;
  actual?: any;
  passed?: boolean;
  error?: string;
  hidden?: boolean;
}

export interface Challenge {
  id: string;
  chapterId: string;
  title: string;
  difficulty: Difficulty;
  xp: number;
  story: string;
  instructions: string;
  starterCode: string;
  solutionSnippet?: string;
  hints: string[];
  testCases: TestCase[];
  entryFunctionName: string;
}

export interface LessonSection {
  title: string;
  content: string; // Markdown or formatted text
  codeExample?: string;
  outputExample?: string;
  tip?: string;
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
  xp: number;
  sections: LessonSection[];
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Chapter {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  biomeName: string;
  description: string;
  accentColor: string;
  iconName: string;
  lessons: string[]; // lesson IDs
  challenges: string[]; // challenge IDs
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'milestone' | 'mastery' | 'streak' | 'explorer';
  requirement: string;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  createdAt: number;
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  activeDates: string[]; // array of YYYY-MM-DD strings
  completedLessons: string[]; // lesson IDs
  completedChallenges: string[]; // challenge IDs
  savedCode: Record<string, string>; // challengeId -> user's code
  unlockedBadges: string[]; // badge IDs
  totalCodeRuns: number;
}
