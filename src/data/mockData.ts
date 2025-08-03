import { loadQuestionsFromCSV } from '@/utils/csvUtils';

// Mock data for the Q&A application

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface User {
  id: string;
  name: string;
  email: string;
  stats: {
    totalQuestions: number;
    correctAnswers: number;
    streak: number;
    averageScore: number;
  };
}

export interface QuizAttempt {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  category: string;
  difficulty: string;
  percentage: number;
}

// Initialize with empty array
export let mockQuestions: Question[] = [];

// Function to load questions
export async function initializeQuestions() {
  try {
    const questions = await loadQuestionsFromCSV('/questions.csv');
    mockQuestions = questions;
    return questions;
  } catch (error) {
    console.error('Failed to load questions:', error);
    throw error;
  }
}

export const mockUser: User = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  stats: {
    totalQuestions: 87,
    correctAnswers: 65,
    streak: 7,
    averageScore: 74.7
  }
};

export const mockQuizHistory: QuizAttempt[] = [
  {
    id: "attempt1",
    date: "2024-01-15T10:30:00Z",
    score: 8,
    totalQuestions: 10,
    timeSpent: 720,
    category: "Current Affairs",
    difficulty: "mixed",
    percentage: 80
  },
  {
    id: "attempt2",
    date: "2024-01-14T09:15:00Z",
    score: 7,
    totalQuestions: 10,
    timeSpent: 645,
    category: "Current Affairs",
    difficulty: "mixed",
    percentage: 70
  },
  {
    id: "attempt3",
    date: "2024-01-13T11:45:00Z",
    score: 9,
    totalQuestions: 10,
    timeSpent: 580,
    category: "Current Affairs",
    difficulty: "mixed",
    percentage: 90
  },
  {
    id: "attempt4",
    date: "2024-01-12T14:20:00Z",
    score: 6,
    totalQuestions: 10,
    timeSpent: 750,
    category: "Current Affairs",
    difficulty: "mixed",
    percentage: 60
  },
  {
    id: "attempt5",
    date: "2024-01-11T16:10:00Z",
    score: 8,
    totalQuestions: 10,
    timeSpent: 690,
    category: "Current Affairs",
    difficulty: "mixed",
    percentage: 80
  }
];