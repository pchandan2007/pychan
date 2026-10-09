import { Chapter } from '../types';

export const CHAPTERS: Chapter[] = [
  {
    id: 'chap-1',
    order: 1,
    title: 'The Whispering Glade',
    subtitle: 'Python Fundamentals & Arithmetic',
    biomeName: 'Green Glade',
    description: 'Awaken your inner programmer in the peaceful forest of Python basics. Learn variables, types, printing, and arithmetic operators.',
    accentColor: '#10B981', // Emerald
    iconName: 'Compass',
    lessons: ['lesson-1-1', 'lesson-1-2'],
    challenges: ['ch-1-1', 'ch-1-2', 'ch-1-3', 'ch-1-4'],
  },
  {
    id: 'chap-2',
    order: 2,
    title: 'The Crossroads of Logic',
    subtitle: 'Conditionals & Boolean Decisions',
    biomeName: 'Crossroads',
    description: 'Navigate ancient stone gates using boolean expressions, if/elif/else branching, and conditional logic.',
    accentColor: '#3B82F6', // Blue
    iconName: 'GitFork',
    lessons: ['lesson-2-1', 'lesson-2-2'],
    challenges: ['ch-2-1', 'ch-2-2', 'ch-2-3', 'ch-2-4'],
  },
  {
    id: 'chap-3',
    order: 3,
    title: 'The Crystal Caverns',
    subtitle: 'String Manipulation & Slicing',
    biomeName: 'Crystal Deeps',
    description: 'Decipher glowing crystal inscriptions using zero-indexing, negative indices, string slicing, and modern f-strings.',
    accentColor: '#8B5CF6', // Purple
    iconName: 'Sparkles',
    lessons: ['lesson-3-1', 'lesson-3-2'],
    challenges: ['ch-3-1', 'ch-3-2', 'ch-3-3', 'ch-3-4'],
  },
  {
    id: 'chap-4',
    order: 4,
    title: 'The Clockwork Citadel',
    subtitle: 'Loops & Iteration Engines',
    biomeName: 'Gearhaven',
    description: 'Power massive mechanical towers with for loops, range sequences, while loops, and loop control statements.',
    accentColor: '#F59E0B', // Amber
    iconName: 'Cog',
    lessons: ['lesson-4-1', 'lesson-4-2'],
    challenges: ['ch-4-1', 'ch-4-2', 'ch-4-3', 'ch-4-4'],
  },
  {
    id: 'chap-5',
    order: 5,
    title: 'The Inventory Forge',
    subtitle: 'Lists, Dictionaries & Data Structures',
    biomeName: 'Dwarven Forge',
    description: 'Forge mighty item bags and key-value codices using Python lists, append/pop methods, and dictionaries.',
    accentColor: '#EC4899', // Pink
    iconName: 'Boxes',
    lessons: ['lesson-5-1', 'lesson-5-2'],
    challenges: ['ch-5-1', 'ch-5-2', 'ch-5-3', 'ch-5-4'],
  },
  {
    id: 'chap-6',
    order: 6,
    title: 'The Celestial Spire',
    subtitle: 'Functions & Algorithmic Mastery',
    biomeName: 'Astral Pinnacle',
    description: 'Ascend to the stars and challenge the PyThon Wyrm. Craft reusable functions and conquer real algorithmic duels.',
    accentColor: '#06B6D4', // Cyan
    iconName: 'Crown',
    lessons: ['lesson-6-1', 'lesson-6-2'],
    challenges: ['ch-6-1', 'ch-6-2', 'ch-6-3', 'ch-6-4'],
  },
];
